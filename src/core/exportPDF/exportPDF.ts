import { jsPDF } from 'jspdf'
import { PDF_EXPORT_SIZE } from '../../common/config/config'
import { openSans } from '../../common/fonts/OpenSans'
import { roboto } from '../../common/fonts/Roboto'
import {
    CircleBlock,
    ImageBlock,
    Presentation,
    RectangleBlock,
    Slide,
    SlideObject,
    TextBlock,
    TriangleBlock,
} from '../types'

export async function exportPDF(model: Presentation): Promise<jsPDF>
{
    const doc: jsPDF = new jsPDF({
        orientation: 'landscape',
        format: [ PDF_EXPORT_SIZE.X, PDF_EXPORT_SIZE.Y ],
        unit: 'px',
    })

    doc.addFileToVFS('Roboto.ttf', roboto)
    doc.addFont('Roboto.ttf', 'Roboto', 'normal')
    doc.addFileToVFS('OpenSans.ttf', openSans)
    doc.addFont('OpenSans.ttf', 'OpenSans', 'normal')

    for (const [ index, slide ] of model.slides.entries())
    {
        await renderSlideOnPDF(doc, slide, index)
    }

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
    }
}

function renderRectangleOnPDF(doc: jsPDF, rectangle: RectangleBlock): void
{
    doc.rect(rectangle.position.x, rectangle.position.y, rectangle.width, rectangle.height, 'F')
}

function renderCircleOnPDF(doc: jsPDF, circle: CircleBlock): void
{
    doc.ellipse(circle.position.x + circle.width / 2, circle.position.y + circle.height / 2, circle.width / 2, circle.height / 2, 'F')
}

function renderTextOnPDF(doc: jsPDF, text: TextBlock): void
{
    if (text.background.hex !== 'none')
    {
        doc.rect(text.position.x, text.position.y, text.width, text.height, 'F')
    }

    doc.setFont(text.font.family)
    doc.setFontSize(text.font.size)

    doc.text(text.content, text.position.x, text.position.y, {
        maxWidth: text.width,
        baseline: 'top',
    })
}

function renderTriangleOnPDF(doc: jsPDF, triangle: TriangleBlock): void
{
    doc.triangle(
        triangle.position.x,
        triangle.position.y + triangle.height,
        triangle.position.x + (triangle.width / 2),
        triangle.position.y,
        triangle.position.x + triangle.width,
        triangle.position.y + triangle.height,
        'F',
    )
}

function renderImageOnPDF(doc: jsPDF, image: ImageBlock): void
{
    doc.addImage(image.source, image.position.x, image.position.y, image.width, image.height)
}

function prepareToRender(doc: jsPDF, object: SlideObject): void
{
    if ('background' in object)
    {
        console.log('figure background', object.id, ...hexToRGB(object.background.hex))
        doc.setFillColor(...hexToRGB(object.background.hex))
    }

    if ('color' in object)
    {
        console.log('figure color', object.id, ...hexToRGB(object.color.hex))
        doc.setTextColor(...hexToRGB(object.color.hex))
    }

    if ('stroke' in object && typeof object.stroke === 'object')
    {
        console.log('figure stroke', object.id, ...hexToRGB(object.stroke.color.hex))
        doc.setDrawColor(...hexToRGB(object.stroke.color.hex))
    }
}

function hexToRGB(hex: string): [ number, number, number ]
{
    const rawHexVal: number = parseInt(hex.slice(1), 16)
    return [
        (rawHexVal & 0xFF0000) >>> 16,
        (rawHexVal & 0x00FF00) >>> 8,
        (rawHexVal & 0x0000FF),
    ]
}