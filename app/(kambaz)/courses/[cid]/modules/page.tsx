export default function Modules() {
    return (
        <div>
            <div id="wd-module-buttons" className="wd-module-buttons">
                <button id="wd-collapse-all">Collapse All</button>
                <button id="wd-view-progress">View Progress</button>
                <select id="wd-publish-all">
                    <option selected value="PUBALL">Publish All</option>
                </select>
                <button id="wd-module-btn">+ Module</button>
            </div>
            <br />
            <ul id="wd-modules">
                <li className="wd-module">
                    <div className="wd-title">Week 1, Lecture 1 - Course Introduction</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to the course</li>
                                <li className="wd-content-item">Learn what is Web Development</li>
                            </ul>
                            <span className="wd-title">READING</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Developing Web Applications - Chapter 1 - React User Interfaces with HTML</li>
                                <li className="wd-content-item">Developing Web Applications - Chapter 2 - Styling Web Pages with CSS</li>
                            </ul>
                            <span className="wd-title">SLIDES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Learning Objectives</li>
                                <li className="wd-content-item">Setting Up the Development Environment</li>
                                <li className="wd-content-item">Introduction to HTML</li>
                                <li className="wd-content-item">Creating a React Application</li>
                            </ul>
                        </li>
                    </ul>
                    <div className="wd-title">Week 1, Lecture 2 - Formatting User Interfaces</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                                <li className="wd-content-item">Deploy the assignment to Netflify</li>
                            </ul>
                            <span className="wd-title">SLIDES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to the DOM</li>
                                <li className="wd-content-item">Formatting web content with lists and tables</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="wd-module"> 
                    <div className="wd-title">Week 2, Lecture 1 - Kambaz Introduction</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Start implementing the Kambaz Web Application</li>
                                <li className="wd-content-item">Update Vercel deployment</li>
                            </ul>
                            <span className="wd-title">READING</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Developing Web Applications - Chapter 3 - Single Page Applications with React</li>
                                <li className="wd-content-item">Developing Web Applications - Chapter 4 - Maintaining State in React Applications</li>
                            </ul>
                            <span className="wd-title">SLIDES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Implementing the Kambaz Account Screens</li>
                                <li className="wd-content-item">Implementing the Kambaz Dashboard Screen</li>
                                <li className="wd-content-item">Implementing the Kambaz Courses Screen</li>
                            </ul>
                        </li>
                    </ul>
                    <div className="wd-title">Week 2, Lecture 2 - Styling Web Pages with CSS and Bootstrap</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to CSS</li>
                                <li className="wd-content-item">Styling dimensions and positions</li>
                            </ul>
                            <span className="wd-title">SLIDES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to Cascading Style Sheets</li>
                                <li className="wd-content-item">The Box Model</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="wd-module"> <div className="wd-title">Week 3</div> </li>
            </ul>
        </div>
);}
