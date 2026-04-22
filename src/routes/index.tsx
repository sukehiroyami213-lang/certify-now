import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CertificateForm, type CertificateData } from "@/components/CertificateForm";
import { Certificate } from "@/components/Certificate";

export const Route = createFileRoute("/")({
  component: Index,
});

function generateCertificateId() {
  const hex = (n: number) =>
    Array.from({ length: n }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
  return `UC-${hex(8)}-${hex(4)}-${hex(4)}-${hex(4)}-${hex(12)}`;
}

function generateReferenceNumber() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function Index() {
  const [data, setData] = useState<CertificateData>({
    studentName: "Pratik Bhoir",
    instructorName: "Lucas Bazilio",
    courseTitle: "The Complete Theory of Computation",
    date: "April 19, 2026",
    duration: "25.5 total hours",
  });

  const [certificateId, setCertificateId] = useState("UC-XXXX-XXXX-XXXX");
  const [referenceNumber, setReferenceNumber] = useState("0000");
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCertificateId(generateCertificateId());
    setReferenceNumber(generateReferenceNumber());
  }, []);

  const handleDownload = async () => {
    if (!certRef.current) return;
    const canvas = await html2canvas(certRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${data.studentName.replace(/\s+/g, "_")}_certificate.pdf`);
  };

  return (
    <div className="min-h-screen bg-muted/40 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Certificate Generator
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Edit the details and download your Udemy-style certificate.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
          <CertificateForm
            data={data}
            onChange={setData}
            onDownload={handleDownload}
            certificateId={certificateId}
          />
          <div>
            <Certificate
              ref={certRef}
              data={data}
              certificateId={certificateId}
              referenceNumber={referenceNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
