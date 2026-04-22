import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export interface CertificateData {
  studentName: string;
  instructorName: string;
  courseTitle: string;
  date: string;
  duration: string;
}

interface Props {
  data: CertificateData;
  onChange: (data: CertificateData) => void;
  onDownload: () => void;
  certificateId: string;
}

export function CertificateForm({ data, onChange, onDownload, certificateId }: Props) {
  const update = (key: keyof CertificateData, value: string) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Certificate Details</h2>
        <p className="text-xs text-muted-foreground mt-1">ID: {certificateId}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="studentName">Student Name</Label>
          <Input
            id="studentName"
            value={data.studentName}
            onChange={(e) => update("studentName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instructorName">Instructor Name</Label>
          <Input
            id="instructorName"
            value={data.instructorName}
            onChange={(e) => update("instructorName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="courseTitle">Course Title</Label>
          <Input
            id="courseTitle"
            value={data.courseTitle}
            onChange={(e) => update("courseTitle", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            value={data.date}
            onChange={(e) => update("date", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={data.duration}
            onChange={(e) => update("duration", e.target.value)}
            placeholder="e.g. 25.5 total hours"
          />
        </div>
      </div>

      <Button onClick={onDownload} className="w-full" size="lg">
        <Download className="mr-2 h-4 w-4" />
        Download Certificate
      </Button>
    </div>
  );
}
