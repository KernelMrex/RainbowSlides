import { jsPDF } from 'jspdf'
import {
    CircleBlock,
    ImageBlock,
    Presentation,
    RectangleBlock,
    Slide,
    SlideObject,
    TextBlock,
    TriangleBlock,
    VideoBlock,
} from '../types'
import { PDF_EXPORT_SIZE } from '../../common/config/config'
import { getDataURI } from '../../common/image/dataURI'
import { getThumbnail } from '../../common/youtube/thumbnail'

export async function exportPDF(model: Presentation): Promise<jsPDF>
{
    const doc: jsPDF = new jsPDF({
        orientation: 'landscape',
        format: [ PDF_EXPORT_SIZE.X, PDF_EXPORT_SIZE.Y ],
        unit: 'px',
    })

    for (const [ index, slide ] of model.slides.entries())
    {
        await renderSlideOnPDF(doc, slide, index)
    }

    doc.save(model.name + '.pdf')
    return doc
}

async function renderSlideOnPDF(doc: jsPDF, slide: Slide, index: number): Promise<void>
{
    if (index !== 0)
    {
        doc.addPage()
    }

    for (const object of slide.objects)
    {
        await renderObjectOnPDF(doc, object)
    }
}

async function renderObjectOnPDF(doc: jsPDF, object: SlideObject): Promise<void>
{
    prepareToRender(doc, object)
    switch (object.type)
    {
        case 'rectangle':
            renderRectangleOnPDF(doc, object)
            break
        case 'text':
            renderTextOnPDF(doc, object)
            break
        case 'circle':
            renderCircleOnPDF(doc, object)
            break
        case 'triangle':
            renderTriangleOnPDF(doc, object)
            break
        case 'image':
            renderImageOnPDF(doc, object)
            break
        case 'video':
            await renderVideoOnPDF(doc, object)
            break
    }
}

function renderRectangleOnPDF(doc: jsPDF, rectangle: RectangleBlock): void
{
    const params = (rectangle.stroke !== undefined) ? 'FD' : 'F'
    doc.rect(rectangle.position.x, rectangle.position.y, rectangle.width, rectangle.height, params)
}

function renderCircleOnPDF(doc: jsPDF, circle: CircleBlock): void
{
    const params = (circle.stroke !== undefined) ? 'FD' : 'F'
    doc.ellipse(circle.position.x, circle.position.y, circle.width / 2, circle.height / 2, params)
}

function renderTextOnPDF(doc: jsPDF, text: TextBlock): void
{
    doc.setFont(text.font.family)
    doc.setFontSize(text.font.size)
    doc.text(text.content, text.position.x, text.position.y)
}

function renderTriangleOnPDF(doc: jsPDF, triangle: TriangleBlock): void
{
    const params = (triangle.stroke !== undefined) ? 'FD' : 'F'
    doc.triangle(
        triangle.position.x,
        triangle.position.y + triangle.height,
        triangle.position.x + (triangle.width / 2),
        triangle.position.y,
        triangle.position.x + triangle.width,
        triangle.position.y + triangle.height,
        params,
    )
}

function renderImageOnPDF(doc: jsPDF, image: ImageBlock): void
{
    doc.addImage(getDataURI(image), image.position.x, image.position.y, image.width, image.height)
}

async function renderVideoOnPDF(doc: jsPDF, video: VideoBlock): Promise<void>
{
    switch (video.sourceType)
    {
        case 'youtube':
            const thumbnailImgData = await getThumbnail(video.source)
            doc.addImage(getDataURI(thumbnailImgData), video.position.x, video.position.y, video.width, video.height)
            doc.link(video.position.x, video.position.y, video.width, video.height, {
                url: video.source,
            })
            break
    }
}

function prepareToRender(doc: jsPDF, object: SlideObject): void
{
    if ('fill' in object)
    {
        doc.setFillColor(object.fill.red, object.fill.green, object.fill.blue)
    }

    if ('color' in object)
    {
        doc.setTextColor(object.color.red, object.color.green, object.color.blue)
    }

    if ('stroke' in object && typeof object.stroke === 'object')
    {
        doc.setDrawColor(object.stroke.color.red, object.stroke.color.green, object.stroke.color.blue)
    }
}