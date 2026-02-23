import { ReactNode } from "react";
import TOC from "./TOC";

export default function LabsLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <div className="p-3">
            <TOC />
            <div className="mt-3">{children}</div>
        </div>
);}
