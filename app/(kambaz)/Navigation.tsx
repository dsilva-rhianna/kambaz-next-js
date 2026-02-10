import { AiOutlineDashboard } from "react-icons/ai";
import { FaFlask, FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
export default function KambazNavigation() {
    return (
        <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" style={{ width: 120 }} id="wd-kambaz-navigation">
            <ListGroupItem className="bg-black border-0 text-center" as="a"
                target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
                <img src="/images/NEU.svg" width="75px" alt="Northeastern University" />
            </ListGroupItem>
            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/account" id="wd-account-link" className="text-white text-decoration-none">
                    <FaRegCircleUser className="fs-1 text-white" />
                    <br />
                    Account
                </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0 bg-white text-center">
                <Link href="/dashboard" id="wd-dashboard-link" className="text-danger text-decoration-none">
                    <AiOutlineDashboard className="fs-1 text-danger" />
                    <br />
                    Dashboard
                </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/dashboard" id="wd-courses-link" className="text-white text-decoration-none">
                    <MdMenuBook className="fs-1 text-danger" />
                    <br />
                    Courses
                </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/calendar" id="wd-calendar-link" className="text-white text-decoration-none">
                    <FaRegCalendarAlt className="fs-1 text-danger" />
                    <br />
                    Calendar
                </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/inbox" id="wd-inbox-link" className="text-white text-decoration-none">
                    <FaInbox className="fs-1 text-danger" />
                    <br />
                    Inbox
                </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/labs" id="wd-labs-link" className="text-white text-decoration-none">
                    <FaFlask className="fs-1 text-danger" />
                    <br />
                    Labs
                </Link>
            </ListGroupItem>
        </ListGroup>
);}
