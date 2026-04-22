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
        className="bg-white w-full aspect-[1.4/1] rounded-lg shadow-xl flex flex-col px-8 md:px-14 py-8 md:py-12"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif", border: "1px solid #e5e7eb" }}
      >
        {/* Top section */}
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <span className="text-3xl md:text-5xl font-extrabold tracking-tight text-black leading-none">
              udemy
            </span>
          </div>
          <div className="text-[8px] md:text-[11px] text-gray-500 text-right leading-[1.6]">
            <div>Certificate no: {certificateId}</div>
            <div>Certificate url: ude.my/{certificateId}</div>
            <div>Reference Number: {referenceNumber}</div>
          </div>
        </div>

        {/* Heading */}
        <div className="mt-8 md:mt-12">
          <p className="text-[9px] md:text-[11px] font-semibold tracking-[0.25em] text-gray-600 uppercase">
            Certificate of Completion
          </p>
          <h1 className="mt-3 md:mt-4 text-2xl md:text-5xl font-extrabold text-black leading-[1.1] tracking-tight">
            {data.courseTitle}
          </h1>
        </div>

        {/* Instructor */}
        <div className="mt-4 md:mt-6 flex items-baseline gap-3">
          <span className="text-xs md:text-sm text-gray-600">Instructors</span>
          <span className="text-xs md:text-sm font-bold text-black">
            {data.instructorName}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-[40px]" />

        {/* Student + footer */}
        <div>
          <h2 className="text-2xl md:text-5xl font-extrabold text-black tracking-tight leading-tight">
            {data.studentName}
          </h2>
          <div className="mt-2 md:mt-3 space-y-0.5 text-xs md:text-sm text-gray-700">
            <div>
              <span className="text-gray-500">Date</span>
              <span className="font-bold text-black ml-2">{data.date}</span>
            </div>
            <div>
              <span className="text-gray-500">Length</span>
              <span className="font-bold text-black ml-2">{data.duration}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Certificate.displayName = "Certificate";
