"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function CourseNavigation() {
    const pathname = usePathname();
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => {
                const pathParts = pathname.split("/");
                const cid = pathParts[2];
                const linkPath = link.toLowerCase();
                let href;
                if (link === "People") {
                  href = `/courses/${cid}/people`;
                } else {
                  href = `/courses/${cid}/${linkPath === "home" ? "" : linkPath}`;
                }
                const isActive = pathname.includes(`/${linkPath}`);
                return (
                    <Link 
                        key={link}
                        href={href}
                        id={`wd-course-${linkPath}-link`}
                        className={`list-group-item border-0 ${isActive ? "active" : "text-danger"}`}
                    >
                        {link}
                    </Link>
                );
            })}
        </div>
    );
}
