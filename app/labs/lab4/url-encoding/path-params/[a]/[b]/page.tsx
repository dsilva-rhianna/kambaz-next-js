"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";

function PathCalculator() {
  const params = useParams();
  const aRaw = params.a as string;
  const bRaw = params.b as string;

  const a = parseFloat(aRaw);
  const b = parseFloat(bRaw);
  const sum = a + b;

  return (
    <div style={{ padding: 40 }}>
      <h1>Calculator – Path Parameters</h1>
      <div style={{ color: "green" }}>Sum = {sum}</div>
    </div>
  );
}

export default function PathCalculatorPage() {
  return (
    <Suspense fallback={<div>Loading calculator...</div>}>
      <PathCalculator />
    </Suspense>
  );
}