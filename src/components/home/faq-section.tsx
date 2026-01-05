"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "Is my video uploaded to a server?",
      answer:
        "No, all processing happens locally in your browser using FFmpeg WASM. Your video never leaves your computer, ensuring 100% privacy.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "No, there are no server-side quotas. However, browser memory and performance may limit extremely large files. Typical video sizes up to several gigabytes should work.",
    },
    {
      question: "Which formats are supported?",
      answer:
        "MP4, MOV, AVI, MKV, WebM, and more. The tool uses FFmpeg's extensive codec support, but output is typically MP4 for best compatibility.",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}