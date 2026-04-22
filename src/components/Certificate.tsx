import { forwardRef } from "react";
import type { CertificateData } from "./CertificateForm";

interface Props {
  data: CertificateData;
  certificateId: string;
  referenceNumber: string;
}

export const Certificate = forwardRef<HTMLDivElement, Props>(
  ({ data, certificateId, referenceNumber }, ref) => {
    const url = `ude.my/${certificateId}`;

    return (
      <div
        ref={ref}
        className="bg-white w-full rounded-2xl shadow-2xl ring-1 ring-black/5 border border-gray-200 flex flex-col p-12 md:p-16 lg:p-20"
        style={{
          fontFamily:
            "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
          aspectRatio: "1.414 / 1",
        }}
      >
        {/* Top section */}
        <div className="flex justify-between items-start gap-6">
          {/* Udemy logo: small purple chevron above the "u" */}
          <div className="relative inline-block leading-none">
            <svg
              viewBox="0 0 32 18"
              className="absolute"
              style={{
                width: "20px",
                height: "11px",
                top: "-8px",
                left: "9px",
              }}
              aria-hidden="true"
            >
              <path
                d="M2 16 L16 4 L30 16"
                fill="none"
                stroke="#a435f0"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="block text-5xl md:text-6xl font-extrabold tracking-tight text-black leading-none"
              style={{ letterSpacing: "-0.05em" }}
            >
              udemy
            </span>
          </div>

          <div className="text-[10px] md:text-[11px] text-gray-500 text-right leading-relaxed font-medium">
            <div>
              Certificete no:{" "}
              <span className="text-gray-700">{certificateId}</span>
            </div>
            <div>
              Certificate url:{" "}
              <span className="text-gray-700">{url}</span>
            </div>
            <div>
              Reference Number:{" "}
              <span className="text-gray-700">{referenceNumber}</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="mt-14 md:mt-16">
          <p className="text-[11px] md:text-xs font-semibold tracking-[0.3em] text-gray-600 uppercase">
            Certificate of Completion
          </p>
          <h1
            className="mt-5 text-4xl md:text-6xl lg:text-7xl font-extrabold text-black leading-[1.05]"
            style={{ letterSpacing: "-0.035em" }}
          >
            {data.courseTitle}
          </h1>
        </div>

        {/* Instructor */}
        <div className="mt-8 md:mt-10 flex items-baseline gap-3">
          <span className="text-base md:text-lg text-gray-600 font-normal">
            Instructors
          </span>
          <span className="text-base md:text-lg font-bold text-black tracking-tight">
            {data.instructorName}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-12" />

        {/* Student + footer */}
        <div>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-black leading-tight"
            style={{ letterSpacing: "-0.035em" }}
          >
            {data.studentName}
          </h2>
          <div className="mt-5 space-y-1.5 text-sm md:text-base">
            <div className="flex items-baseline">
              <span className="text-gray-500 w-20">Date</span>
              <span className="font-bold text-black">{data.date}</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-gray-500 w-20">Length</span>
              <span className="font-bold text-black">{data.duration}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Certificate.displayName = "Certificate";
