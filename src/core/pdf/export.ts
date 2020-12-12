import { jsPDF } from 'jspdf'
import { CircleBlock, Presentation, RectangleBlock, Slide, SlideObject, TextBlock } from '../types'

export function exportPDF(model: Presentation): void
{
    const doc: jsPDF = new jsPDF({
        orientation: 'landscape',
    })

    model.slides.forEach(renderSlideOnPDF(doc))

    doc.save(model.name + '.pdf')
}

function renderSlideOnPDF(doc: jsPDF): (slide: Slide, index: number) => void
{
    return (slide: Slide, index: number) => {
        if (index !== 0)
        {
            doc.addPage()
        }

        slide.objects.forEach(renderObjectOnPDF(doc))
    }
}

function renderObjectOnPDF(doc: jsPDF): (object: SlideObject, index: number) => void
{
    return (object: SlideObject) => {
        switch (object.type)
        {
            case 'rectangle':
                renderRectangleOnPDF(doc, object as RectangleBlock)
                break
            case 'text':
                renderTextOnPDF(doc, object as TextBlock)
                break
            case 'circle':
                renderCircleOnPDF(doc, object as CircleBlock)
                break
        }
    }
}

function renderRectangleOnPDF(doc: jsPDF, rectangle: RectangleBlock): void
{
    doc.rect(rectangle.position.x, rectangle.position.y, rectangle.width, rectangle.height)
}

function renderTextOnPDF(doc: jsPDF, text: TextBlock): void
{
    const prevColor: string = doc.getTextColor()

    doc.setTextColor(text.color.hex)
    doc.text(text.content, text.position.x, text.position.y)

    doc.setTextColor(prevColor)
}

function renderCircleOnPDF(doc: jsPDF, circle: CircleBlock): void
{
    doc.ellipse(circle.position.x, circle.position.y, circle.width / 2, circle.height / 2)
}
