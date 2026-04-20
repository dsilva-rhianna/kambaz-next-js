import Link from "next/link";
export default function labs() {
    return (
        <div id="wd-labs">
            <h1>Rhianna DSilva and Rowen Latif (CS4550 - Online Section)</h1>
            <h1>Labs</h1>
            <ul>
                <li>
                    <Link href="/labs/lab1" id="wd-lab1-link">
                    Lab 1: HTML Examples </Link>
                </li>
                <li>
                    <Link href="/labs/lab2" id="wd-lab2-link">
                    Lab 2: CSS Basics </Link>
                </li>
                <li>
                    <Link href="/labs/lab3" id="wd-lab3-link">
                    Lab 3: JavaScript Fundamentals </Link>
                </li>
                <li>
                    <Link href="/labs/lab4" id="wd-lab4-link">
                    Lab 4: State Maintenance </Link>
                </li>
                <li>
                    <Link href="/labs/Lab5" id="wd-lab5-link">
                    Lab 5: HTTP Servers </Link>
                </li>
                <li>
                    <Link href="/" id="wd-kambaz-link">
                    Kambaz (Includes Quizzes Project)</Link>
                </li>
                <li>
                    <Link href="https://github.com/dsilva-rhianna/kambaz-next-js" id="wd-github-reach">
                    React GitHub </Link>
                </li>
                <li>
                    <Link href="https://github.com/dsilva-rhianna/kambaz-node-server-app" id="wd-github-node">
                    Node GitHub </Link>
                </li>
                <li>
                    <Link href="https://kambaz-node-server-final-project.onrender.com" id="wd-render">
                    Render Link </Link>
                </li>
            </ul>
        </div>
);}
