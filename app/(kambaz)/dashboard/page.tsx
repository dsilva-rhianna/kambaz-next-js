import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (10)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link href="/courses/1234" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack Software Developer
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/courses/3520" className="wd-dashboard-course-link">
                        <Image src="/images/cpp.jpg" width={200} height={150} alt="cpp" />
                        <div>
                            <h5> CS3520 Programming in C++ </h5>
                            <p className="wd-dashboard-course-title">
                                Systems Engineer
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/courses/1145" className="wd-dashboard-course-link">
                        <Image src="/images/humanvalues.jpg" width={200} height={150} alt="humanvalues" />
                        <div>
                            <h5> PHIL1145 Technology and Human Values </h5>
                            <p className="wd-dashboard-course-title">
                                Technology Policy Analyst
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/courses/3081" className="wd-dashboard-course-link">
                        <Image src="/images/stats.jpg" width={200} height={150} alt="stats" />
                        <div>
                            <h5> MATH3081 Probability and Statistics </h5>
                            <p className="wd-dashboard-course-title">
                                Data Analyst
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/courses/2550" className="wd-dashboard-course-link">
                        <Image src="/images/cybersecurity.jpg" width={200} height={150} alt="cybersecurity" />
                        <div>
                            <h5> CYY2550 Foundations of Cybersecurity </h5>
                            <p className="wd-dashboard-course-title">
                                Cybersecurity Analyst
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/courses/2209" className="wd-dashboard-course-link">
                        <Image src="/images/finance.jpg" width={200} height={150} alt="finance" />
                        <div>
                            <h5> FINA2209 Financial Management </h5>
                            <p className="wd-dashboard-course-title">
                                Financial Manager
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/courses/3800" className="wd-dashboard-course-link">
                        <Image src="/images/theory.jpg" width={200} height={150} alt="theory" />
                        <div>
                            <h5> CS3800 Theory of Computation </h5>
                            <p className="wd-dashboard-course-title">
                                Theoretical Computer Scientist
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/courses/1800" className="wd-dashboard-course-link">
                        <Image src="/images/discrete.jpg" width={200} height={150} alt="discrete" />
                        <div>
                            <h5> CS1800 Discrete Structures </h5>
                            <p className="wd-dashboard-course-title">
                                Computational Mathematician
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/courses/3500" className="wd-dashboard-course-link">
                        <Image src="/images/ood.jpg" width={200} height={150} alt="ood" />
                        <div>
                            <h5> CS3500 Object Oriented Design </h5>
                            <p className="wd-dashboard-course-title">
                                Software Architect
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/courses/3000" className="wd-dashboard-course-link">
                        <Image src="/images/algorithms.jpg" width={200} height={150} alt="algorithms" />
                        <div>
                            <h5> CS3000 Algorithms and Data </h5>
                            <p className="wd-dashboard-course-title">
                                Algorithm Engineer
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
);}
