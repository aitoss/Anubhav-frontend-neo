import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../constants";

const ViewBlog = () => {
  const { id } = useParams();

  const data = `<p><strong>Background: <br></strong>Department: Computer Engineering<br>I was in my 3rd year and had explored web development, ML, and a little bit of almost everything. Like out of nowhere I used to check what Docker is and after that Kubernetes. I know all of this isn't needed but I just want to explore. You know curiosity.<br>I was ok with data structures and Algorithms, I can solve easy and medium problems and hard is hard 💪 ( Leetcode levels ).</p>
    <p>I never did much competitive coding, but it's good to do if you can stick to it. CP can make you solve those hard problems easily. 😀</p>
    <p>I have participated in a lot of hackathons also won 7+ hackathons (check HackerEarth)</p>
    <p>I was in my 3rd year when one of our seniors posted for Microsoft Internship referrals.  And like everybody applied from our batch (most of)</p>
    <p></p>
    <p><strong>Round 1: Mettl</strong></p>
    <p>Received Mettl test link which was valid for a day. Everybody received links on different days. Many haven't received (poor Resume, GPA, luck )🤔</p>
    <p><strong>Duration: 1.5 hr</strong></p>
    <p><strong>Question: 3</strong></p>
    <p><strong>Level: Easy</strong></p>
    <p><strong>Question: </strong>In the given array print the 3rd largest number?</p>
    <p>I don't remember other questions but those were quite easy (string/ array based)</p>
    <p></p>
    <p><strong>Round 2: Virtual Interview </strong></p>
    <p><strong>Duration: 1 hr</strong></p>
    <p><strong>Platform: Microsoft Teams</strong></p>
    <p>received selection mail of 1st round and that my virtual interview is scheduled. <br>It was like 10 days prior to the interview and I used the period quite wisely to revise DSA, OOP, C++ fundamentals, etc. I used GeeksForGeeks and Youtube videos.</p>
    <p><strong>Questions : </strong></p>
    <p><strong>1. Given a family tree, how would you print the whole family generation wise? </strong></p>
    <p>Ans: It was a simple BFS traversal and printing question, I explained the approach and he said to screen share and code in any editor my choice.</p>
    <p>While Implementing I used <strong>queue data structure (STL) </strong>and used proper functions, naming convention, code comments wherever needed.</p>
    <p>He asked about time complexity and then said to implement-<br><strong>2.</strong> <strong>Queue data structure Implementation?</strong><br>Ans: I explained and implemented it using Arrays and keeping front and back pointers. He asked me about all operations queue support, and implement them. <br>He then asked about the trade-offs of array implementation?<br>I told in terms of constant space allocation and linked list implementation can solve it. He said ok and not said to imlement the LL version.<br>Again write code making classes, constructors, destructors, and explain a bit about them while coding. It leaves a positive impact.<strong><br><br>After this little bit from my resume and about my interests.</strong></p>
    <p><strong>Time was around November and we were going back home in preparation leaves.<br>I was on the train when I received selection mail for onsites. I was quite happy then.<br><br>Round 3: Onsite Interview<br>Date: 21st December 2019</strong></p>
    <p><strong>Location: Microsoft, Hyderabad</strong></p>
    <p>This is where the fun starts.  We were a total of 6 students from AIT going.<br>We were given full <strong>Flight Ticket reimbursement, Hotel reimbursement up to 8k</strong>.<br>We obviously booked a 5star hotel, <strong>JW Mariott,</strong> and enjoyed it to the fullest. Hyderabad FC steam was also staying in the same hotel.<br></p>
    <p>Morning 9 AM we left for the Microsoft campus. <br>We were seated and then called one by one to different interview rooms.<br><strong>Duration: 65-70 Minutes<br>Questions :</strong></p>
    <ul>
    <li>Explain your hackathon projects?</li>
    <li>How you will design a crime alert system if given access to all cameras? (I told then he smiled and said just think about all the weird things you can do!)<br>Design Whatsapp?<br>(Took most time, I do a lot of projects so had knowledge of system design in general)</li>
    <li>AWS EC2 (mentioned in projects in deploy section )and how you connect to it? (SSH and its port number)<br>HTTP vs HTTPS ?<br>Default Port Numbers of Different protocols (HTTP, FTP)</li>
    <li>Design a state machine for the detection of odd and even numbers?  (Theory of computation asked 😂)</li>
    <li>Different types of tests?</li>
    </ul>
    <p><strong><br>It was a very different experience for me like I was enjoying it a lot.</strong><br><strong><br>We had our lunch, the interviewer came and had lunch with us. We were provided with lunch.<br>Also, we can use any of the refrigerators to drink any drink of our choice. Feel Free to take anything. <br></strong></p>
    <p><strong>Round 4: HR Round </strong></p>
    <p><strong>Duration: 30 Min</strong></p>
    <p>What's your background?<br>Where you did your schooling?<br>What did you learn at previous internships?<br>What you will do differently if again given chance to do it?<br>Why Microsoft?<br>What would you like to do?<br>Any Questions?<br><br>After this, we were asked to leave and explore the campus.<br>Trust me, friends, it's beautiful. MS has its own pond, big buildings, basketball, cricket ground.<strong><br></strong>Our flight back to Pune was at night 2 AM.<br>We then moved to a mall near MS and had our dinner. Guess?<br>Yes, Hyderabadi Biryani !!<br></p>
    <p>All of us slept on the table we had our food and then tan tan tan....all phone had notification at the same time. Yes, seconds back and forth.<br><br>One of us opened and selected ...and then <strong>bang all 6 were selected</strong>. Oh my god ..we were yelling in the mall. So happy, cheerful faces.<br>It was the day I will remember all my life,  21st December. AIT created history.<div style="text-align:none;"></div></p>
    <p><strong>Results: <br>Selected <br>Duration: 52 Days (covid WFH story)</strong></p>
    <p><strong>Stipend: 80K/month</strong></p>
    <p><br>So friends just follow what you like to do, be it web dev, AI, android dev, Competetive coding. You will get it if you are good with what you do. Also, good preparation of interviews is a game-changer for sure.<br><br>And luck matters, but in long run you will get to the place you deserve.<br>All the best.👍<br><br></p>`;

  const [blog, setBlog] = useState<any>({});

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/blog/${id}`);
        console.log(response.data.description);
        setBlog(response.data);
      } catch (error) {
        console.error("Error getting blog:", error);
      }
    };

    fetchBlog();
  }, []);

  return (
      <ReactQuill
        value={data}
        theme="bubble"
        readOnly
        className="w-full h-full"
      />
  );
};

export default ViewBlog;