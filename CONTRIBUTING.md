# Anubhav - Experience Sharing Platform 

**Anubhav: Experience Sharing Point (A-ESP)** is a platform developed for AITians to read & share encounters of various interviews.

The story of Anubhav, is as interesting as this portal. With lots of brainstorming discussion, and a motivation to improve this at each possible stage. We have created this mind-blowing portal. Explore this link to know more about [product owners](https://anubhav.aitoss.club/), how it started, and the timeline for various phases of development.

We welcome contributions from the community. To make sure your contributions count , Please follow up the guidelines mentioned :

## Contribution Guidelines

🎉Huge shout-out for jumping in and lending a hand with this project!🎉 Your contribution is really appreciated and helping move things forward in such a great way!

## Prerequisite :

ReactJS , Make sure you are well versed with the react fundamentals and functionalities as the Anubhav is mostly on Frontend part having knowledge on TailwindCss , JavaScript , TypeScript , Framer Motion will make you feel comfortable with the code base

Now that , I think you got what's needed , lets get to the point ....

## How do I setup the Project?

### **Step 1: Fork the Repository**
1. Go to the [Anubhav-frontend-neo repository](https://github.com/aitoss/Anubhav-frontend-neo).
2. Click the "Fork" button at the top right of the page to create a copy of the repository in your GitHub account.

### **Step 2: Clone the Forked Repository**
1. Open your terminal or command prompt.
2. Navigate to the directory where you want to store your project.
3. Run the following command to clone the forked repository:

```bash
git clone https://github.com/your-username/Anubhav-frontend-neo.git
  ```

### **Step 3: Navigate to the Project Directory**
Make sure you're in the root directory of your project. Then, install the necessary dependencies using:

```bash
  cd repository-name
  ```

### **Step 4: Install Dependencies**
Make sure you're in the root directory of your project. Then, install the necessary dependencies using:

```bash
npm install
```


### **Step 5: Start the Development Server**
After the dependencies are installed, start the development server using:

```bash
npm run dev
```

You’ll see output in your terminal with a local server address (e.g., http://localhost:5173).

### **Step 6: Open the Project in Your Browser**
Open your browser and go to the local server address (e.g., http://localhost:5173) to see Anubhav Frontend in action!




## How can I contribute ?

1. **Fork the Repository :** Clone our project to your own playground! 🚀

2. **Create Your Feature Branch :** Create a new branch for your feature or bug fix🤖 using below command 

  ```bash
  git checkout -b feature/your-feature-name
  ```

3. **Make Your Changes :** Dive in, get creative, and add that special touch! 🎨

```bash
git commit -m "✨ Add my amazing feature or fix a pesky bug!"
```

4. **Push Your Changes :** Share your brilliance with the world:

```bash
git push origin feature/your-awesome-feature
```

5. **Create a Pull Request :** Now it’s time to let us know about your contributions! Open a pull request to the main branch of our repository and let’s make magic happen together! ✨

Create a Pull Request: Now it’s time to let us know about your contributions! Open a pull request to the main branch of our repository and let’s make magic happen together! 🔭

🚀 **Commit Type Must Be One of the Following:** 🚀

- **feat:** A brand new feature that adds awesomeness!  
- **fix:** A bug fix to keep everything running smoothly!  
- **style:** CSS changes that enhance the look and feel!  
- **cleanup:** Tidying up the code without changing its meaning (think white-space, formatting, missing semi-colons, and dead code removal)!  
- **refactor:** Code changes that optimize without fixing bugs or adding features!  
- **perf:** Performance improvements to make your code faster!  
- **test:** Adding or fixing missing tests to ensure reliability!  
- **chore:** Updates to the build process or tools, including documentation generation!  
- **tracking:** Any tracking-related changes, from bug tracking to user analytics and A/B testing!  
- **docs:** Changes that enhance our documentation only!  

Let’s keep our commits clear and impactful! 🌟

### Found an Issue ?


**Whether it’s a bug, code redundancy, or any other issue, we encourage you to raise it! This helps us improve the product and take it to new heights.**

**How do I raise an issue?**
It’s as simple as raising your hand when you have a doubt!

- Navigate to the Issues section and click on New Issue.
- Provide detailed information about the bug or issue, including a clear description and, if possible, any relevant results. This helps the project owners understand and resolve it faster.

  
**Bonus!**

Once you've raised an issue, the team might even assign it to you, giving you the opportunity to contribute with a PR (Pull Request)!

### **File Structure**

```
project-name/
├── public/
│   ├── assets
│   └── dev
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── constants.js
│   ├── declaration.d.ts
│   ├── main.jsx
│   └── index.css
├── utils/
|   └── cn.ts
├── .gitignore
├── index.html
├── .prettierrc
├── .CONTRIBUTING.md
├── package.json
├── vercel.json
├── style.css
├── vite.config.js
└── README.md
```

**Components :** All the reusable components are written in this folder according to feature you are working on. 

**Pages :** All the web pages with routes defined are under this folder.

**Services :** All about the Date Functionality and Reading Time Functionality.

**App.jsx :** All the routes and landing page components are present in the file.

**package.json :** Information regarding the running , building , preview and all the dev dependencies are clearly mentioned in this json file.

**tailwind.config.js :** The tailwind.config.js file is your creative canvas, where you customize and extend Tailwind CSS's design system to make your project uniquely yours! 🎨✨

### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes"
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference issues that this commit **Closes**.
