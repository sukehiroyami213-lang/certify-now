import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { CertificateForm, type CertificateData } from "@/components/CertificateForm";
import { Certificate } from "@/components/Certificate";

export const Route = createFileRoute("/")({
  component: Index,
});

function generateCertificateId() {
  const seg = () =>
    Math.random().toString(36).substring(2, 6).toUpperCase();
  return `UC-${seg()}-${seg()}-${seg()}`;
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
    try {
      const node = certRef.current;
      const width = node.offsetWidth;
      const height = node.offsetHeight;

      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        width,
        height,
        cacheBust: true,
      });

      const pdf = new jsPDF({
        orientation: width >= height ? "landscape" : "portrait",
        unit: "px",
        format: [width, height],
        hotfixes: ["px_scaling"],
      });
      pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
      pdf.save(`${data.studentName.replace(/\s+/g, "_") || "certificate"}_certificate.pdf`);
      toast.success("Certificate downloaded");
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      toast.error("Failed to generate PDF. Please try again.");
    }
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
