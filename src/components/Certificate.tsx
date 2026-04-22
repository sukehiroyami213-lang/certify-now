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
        className="bg-white w-full aspect-[4/3] md:aspect-[1.4/1] rounded-lg shadow-xl flex flex-col p-10 md:p-14"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif", border: "1px solid #e5e7eb" }}
      >
        {/* Top section */}
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-black">
              udemy
            </span>
          </div>
          <div className="text-[10px] md:text-xs text-gray-500 text-right space-y-1 leading-relaxed">
            <div>Certificate no: {certificateId}</div>
            <div>Certificate url: {url}</div>
            <div>Reference Number: {referenceNumber}</div>
          </div>
        </div>

        {/* Heading */}
        <div className="mt-10 md:mt-12">
          <p className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-gray-600 uppercase">
            Certificate of Completion
          </p>
          <h1 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight tracking-tight">
            {data.courseTitle}
          </h1>
        </div>

        {/* Instructor */}
        <div className="mt-6 md:mt-8 flex items-baseline gap-3">
          <span className="text-sm md:text-base text-gray-600">Instructors</span>
          <span className="text-sm md:text-base font-bold text-black">
            {data.instructorName}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Student + footer */}
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight">
            {data.studentName}
          </h2>
          <div className="mt-3 space-y-1 text-sm md:text-base text-gray-700">
            <div>
              <span className="text-gray-500">Date</span>{" "}
              <span className="font-bold text-black ml-2">{data.date}</span>
            </div>
            <div>
              <span className="text-gray-500">Length</span>{" "}
              <span className="font-bold text-black ml-2">{data.duration}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Certificate.displayName = "Certificate";
