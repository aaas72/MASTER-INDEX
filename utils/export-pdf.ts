import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPdf(elementId: string, fileName: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    // 1. Capture with high resolution and specific scale
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      ignoreElements: (el: HTMLElement) => el.classList.contains('no-export'),
    } as any);

    // 2. Setup jsPDF (A4 format)
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Reduced margins for full-width look
    const margin = 0; 
    const headerHeight = 25;
    const footerHeight = 15;
    const contentWidth = pageWidth; // Stretch to full page width
    const contentHeightPerPage = pageHeight - headerHeight - footerHeight;

    // Source dimensions (from canvas)
    const sWidth = canvas.width;
    const sHeightPerPage = (contentHeightPerPage * canvas.width) / contentWidth;
    
    let sHeightLeft = canvas.height;
    let sPositionY = 0;
    let pageNumber = 1;

    // Function to draw overlays (Header, Footer ONLY)
    const drawOverlays = (page: number) => {
      // --- HEADER ---
      pdf.setFillColor(0, 47, 167); 
      pdf.rect(0, 0, pageWidth, headerHeight, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text("MASTER_INDEX", 10, 12);
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(200, 210, 255);
      pdf.text("ALGORITHM_LABORATORY_SYSTEM // RESEARCH_DIVISION", 10, 18);
      pdf.setFontSize(7);
      pdf.text(`REPORT_ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`, pageWidth - 50, 10);
      pdf.text(`TS: ${new Date().toLocaleString()}`, pageWidth - 50, 15);

      // --- FOOTER ---
      pdf.setFillColor(248, 250, 252);
      pdf.rect(0, pageHeight - footerHeight, pageWidth, footerHeight, 'F');
      pdf.setTextColor(100, 116, 139);
      pdf.setFontSize(8);
      pdf.text("Formal output of Master Index Simulation Engine. Full-Width Analysis.", 10, pageHeight - 6);
      pdf.text(`PAGE ${page.toString().padStart(2, '0')}`, pageWidth - 25, pageHeight - 6);
    };

    // 3. Multi-page Loop with Smart Cropping
    while (sHeightLeft > 0) {
      const currentSHeight = Math.min(sHeightLeft, sHeightPerPage);
      
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = sWidth;
      tempCanvas.height = currentSHeight;
      const ctx = tempCanvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(
          canvas, 
          0, sPositionY, sWidth, currentSHeight,
          0, 0, sWidth, currentSHeight
        );
        
        const pageImgData = tempCanvas.toDataURL('image/png');
        const displayHeight = (currentSHeight * contentWidth) / sWidth;

        // Draw content FIRST (Stretched to margins)
        pdf.addImage(
          pageImgData, 
          'PNG', 
          margin, 
          headerHeight, 
          contentWidth, 
          displayHeight,
          undefined, 
          'FAST'
        );

        // Draw Overlays LAST (Header/Footer ONLY)
        drawOverlays(pageNumber);
      }

      sHeightLeft -= currentSHeight;
      sPositionY += currentSHeight;

      if (sHeightLeft > 5) { 
        pdf.addPage();
        pageNumber++;
      }
    }

    // 4. Save the file
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('PDF Export Error:', error);
  }
}
