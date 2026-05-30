import type { NextApiRequest, NextApiResponse } from "next";
import { studentIds } from "@/data/studentIds";

type ResponseData = {
  isValid: boolean;
  message?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({ isValid: false, message: "Student ID is required" });
    }

    const isValid = studentIds.includes(studentId);

    if (isValid) {
      res.status(200).json({ isValid: true });
    } else {
      res.status(404).json({ isValid: false, message: "Student ID not found" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
