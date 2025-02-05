var blogs = [
    {
        "blog-id": 1,
        "username": "Alec Whitten",
        "publishing-date": "1 Jan 2023",
        "cover": "",
        "title": "Bill Walsh leadership lessons",
        "description": "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
        "topics": ["Leadership", "Management"]
    },
    {
        "blog-id": 2,
        "username": "Demi Wilkinson",
        "publishing-date": "1 Jan 2023",
        "cover": "",
        "title": "PM mental models",
        "description": "Mental models are simple expressions of complex processes or relationships.",
        "topics": ["Product", "Research", "Frameworks"]
    },
    {
        "blog-id": 3,
        "username": "Candice Wu",
        "publishing-date": "1 Jan 2023",
        "cover": "",
        "title": "What is Wireframing?",
        "description": "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
        "topics": ["Design", "Research"]
    },
    {
        "blog-id": 4,
        "username": "Alec Whitten",
        "publishing-date": "1 Jan 2023",
        "cover": "",
        "title": "Bill Walsh leadership lessons",
        "description": "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
        "topics": ["Leadership", "Management"]
    },
    {
        "blog-id": 5,
        "username": "Demi Wilkinson",
        "publishing-date": "1 Jan 2023",
        "cover": "",
        "title": "PM mental models",
        "description": "Mental models are simple expressions of complex processes or relationships.",
        "topics": ["Product", "Research", "Frameworks"]
    },
    {
        "blog-id": 6,
        "username": "Candice Wu",
        "publishing-date": "1 Jan 2023",
        "cover": "",
        "title": "What is Wireframing?",
        "description": "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
        "topics": ["Design", "Research"]
    },
    {
        "blog-id": 7,
        "username": "Michael Hayes",
        "publishing-date": "5 Feb 2023",
        "cover": "",
        "title": "Agile vs Waterfall: Choosing the right methodology",
        "description": "A guide to understanding when to use Agile and when to stick with Waterfall.",
        "topics": ["Project Management", "Agile", "Waterfall"]
    },
    {
        "blog-id": 8,
        "username": "Samantha Lee",
        "publishing-date": "12 Mar 2023",
        "cover": "",
        "title": "UI Design trends for 2024",
        "description": "Explore the cutting-edge design trends that will define user interfaces in 2024.",
        "topics": ["UI Design", "Trends", "Creativity"]
    },
    {
        "blog-id": 9,
        "username": "Thomas Green",
        "publishing-date": "18 Apr 2023",
        "cover": "",
        "title": "The power of storytelling in product design",
        "description": "How storytelling can improve the way users interact with your product.",
        "topics": ["Design", "Storytelling", "User Experience"]
    },
    {
        "blog-id": 10,
        "username": "Emily Brown",
        "publishing-date": "10 May 2023",
        "cover": "",
        "title": "Effective stakeholder communication",
        "description": "Tips for keeping stakeholders informed and engaged throughout your projects.",
        "topics": ["Communication", "Stakeholders", "Leadership"]
    },
    {
        "blog-id": 11,
        "username": "Ryan Carter",
        "publishing-date": "21 May 2023",
        "cover": "",
        "title": "Introduction to No-Code Development",
        "description": "Why No-Code platforms are the future of product development.",
        "topics": ["No-Code", "Development", "Innovation"]
    },
    {
        "blog-id": 12,
        "username": "Sophia Morgan",
        "publishing-date": "30 Jun 2023",
        "cover": "",
        "title": "Data visualization tools: What’s new?",
        "description": "An overview of the latest tools and techniques in data visualization.",
        "topics": ["Data", "Visualization", "Tools"]
    },
    {
        "blog-id": 13,
        "username": "James Taylor",
        "publishing-date": "15 Jul 2023",
        "cover": "",
        "title": "Psychology in UX Design",
        "description": "How understanding human psychology can lead to better user experiences.",
        "topics": ["UX", "Psychology", "Design"]
    },
    {
        "blog-id": 14,
        "username": "Olivia Adams",
        "publishing-date": "8 Aug 2023",
        "cover": "",
        "title": "The rise of AI in project management",
        "description": "How artificial intelligence is transforming project management.",
        "topics": ["AI", "Project Management", "Technology"]
    },
    {
        "blog-id": 15,
        "username": "Liam Mitchell",
        "publishing-date": "22 Aug 2023",
        "cover": "",
        "title": "Customer Journey Mapping 101",
        "description": "Learn how to map out the customer journey to improve satisfaction.",
        "topics": ["Customer Experience", "Journey Mapping", "Research"]
    },
    {
        "blog-id": 16,
        "username": "Emma Roberts",
        "publishing-date": "4 Sep 2023",
        "cover": "",
        "title": "Remote team collaboration tools",
        "description": "Top tools and tips for managing remote teams effectively.",
        "topics": ["Remote Work", "Collaboration", "Tools"]
    },
    {
        "blog-id": 17,
        "username": "Chris Wilson",
        "publishing-date": "19 Sep 2023",
        "cover": "",
        "title": "Gamification in product design",
        "description": "Using gamification techniques to boost user engagement.",
        "topics": ["Design", "Gamification", "Engagement"]
    },
    {
        "blog-id": 18,
        "username": "Grace Martin",
        "publishing-date": "7 Oct 2023",
        "cover": "",
        "title": "Sustainable product development",
        "description": "Why sustainability matters in the product development lifecycle.",
        "topics": ["Sustainability", "Development", "Innovation"]
    },
    {
        "blog-id": 19,
        "username": "Matthew Scott",
        "publishing-date": "20 Oct 2023",
        "cover": "",
        "title": "Breaking down the Kanban method",
        "description": "A practical guide to mastering the Kanban method.",
        "topics": ["Kanban", "Project Management", "Efficiency"]
    },
    {
        "blog-id": 20,
        "username": "Sophia White",
        "publishing-date": "5 Nov 2023",
        "cover": "",
        "title": "The future of AR in education",
        "description": "How augmented reality is revolutionizing the learning experience.",
        "topics": ["AR", "Education", "Technology"]
    },
    {
        "blog-id": 21,
        "username": "Jacob Thomas",
        "publishing-date": "17 Nov 2023",
        "cover": "",
        "title": "Inclusive design principles",
        "description": "Creating designs that cater to diverse user needs.",
        "topics": ["Design", "Inclusion", "UX"]
    },
    {
        "blog-id": 1,
        "username": "Alec Whitten",
        "publishing-date": "1 Jan 2023",
        "cover": "",
        "title": "Bill Walsh leadership lessons",
        "description": "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
        "topics": ["Leadership", "Management"]
    },
    {
        "blog-id": 2,
        "username": "Demi Wilkinson",
        "publishing-date": "1 Jan 2023",
        "cover": "",
        "title": "PM mental models",
        "description": "Mental models are simple expressions of complex processes or relationships.",
        "topics": ["Product", "Research", "Frameworks"]
    },
    {
        "blog-id": 3,
        "username": "Candice Wu",
        "publishing-date": "1 Jan 2023",
        "cover": "",
        "title": "What is Wireframing?",
        "description": "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
        "topics": ["Design", "Research"]
    },
    {
        "blog-id": 4,
        "username": "Alec Whitten",
        "publishing-date": "1 Jan 2023",
        "cover": "",
        "title": "Bill Walsh leadership lessons",
        "description": "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
        "topics": ["Leadership", "Management"]
    },
    {
        "blog-id": 5,
        "username": "Demi Wilkinson",
        "publishing-date": "1 Jan 2023",
        "cover": "",
        "title": "PM mental models",
        "description": "Mental models are simple expressions of complex processes or relationships.",
        "topics": ["Product", "Research", "Frameworks"]
    },
    {
        "blog-id": 6,
        "username": "Candice Wu",
        "publishing-date": "1 Jan 2023",
        "cover": "",
        "title": "What is Wireframing?",
        "description": "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
        "topics": ["Design", "Research"]
    },
    {
        "blog-id": 7,
        "username": "Michael Hayes",
        "publishing-date": "5 Feb 2023",
        "cover": "",
        "title": "Agile vs Waterfall: Choosing the right methodology",
        "description": "A guide to understanding when to use Agile and when to stick with Waterfall.",
        "topics": ["Project Management", "Agile", "Waterfall"]
    },
    {
        "blog-id": 8,
        "username": "Samantha Lee",
        "publishing-date": "12 Mar 2023",
        "cover": "",
        "title": "UI Design trends for 2024",
        "description": "Explore the cutting-edge design trends that will define user interfaces in 2024.",
        "topics": ["UI Design", "Trends", "Creativity"]
    },
    {
        "blog-id": 9,
        "username": "Thomas Green",
        "publishing-date": "18 Apr 2023",
        "cover": "",
        "title": "The power of storytelling in product design",
        "description": "How storytelling can improve the way users interact with your product.",
        "topics": ["Design", "Storytelling", "User Experience"]
    },
    {
        "blog-id": 10,
        "username": "Emily Brown",
        "publishing-date": "10 May 2023",
        "cover": "",
        "title": "Effective stakeholder communication",
        "description": "Tips for keeping stakeholders informed and engaged throughout your projects.",
        "topics": ["Communication", "Stakeholders", "Leadership"]
    },
    {
        "blog-id": 11,
        "username": "Ryan Carter",
        "publishing-date": "21 May 2023",
        "cover": "",
        "title": "Introduction to No-Code Development",
        "description": "Why No-Code platforms are the future of product development.",
        "topics": ["No-Code", "Development", "Innovation"]
    },
    {
        "blog-id": 12,
        "username": "Sophia Morgan",
        "publishing-date": "30 Jun 2023",
        "cover": "",
        "title": "Data visualization tools: What’s new?",
        "description": "An overview of the latest tools and techniques in data visualization.",
        "topics": ["Data", "Visualization", "Tools"]
    },
    {
        "blog-id": 13,
        "username": "James Taylor",
        "publishing-date": "15 Jul 2023",
        "cover": "",
        "title": "Psychology in UX Design",
        "description": "How understanding human psychology can lead to better user experiences.",
        "topics": ["UX", "Psychology", "Design"]
    },
    {
        "blog-id": 14,
        "username": "Olivia Adams",
        "publishing-date": "8 Aug 2023",
        "cover": "",
        "title": "The rise of AI in project management",
        "description": "How artificial intelligence is transforming project management.",
        "topics": ["AI", "Project Management", "Technology"]
    },
    {
        "blog-id": 15,
        "username": "Liam Mitchell",
        "publishing-date": "22 Aug 2023",
        "cover": "",
        "title": "Customer Journey Mapping 101",
        "description": "Learn how to map out the customer journey to improve satisfaction.",
        "topics": ["Customer Experience", "Journey Mapping", "Research"]
    },
    {
        "blog-id": 16,
        "username": "Emma Roberts",
        "publishing-date": "4 Sep 2023",
        "cover": "",
        "title": "Remote team collaboration tools",
        "description": "Top tools and tips for managing remote teams effectively.",
        "topics": ["Remote Work", "Collaboration", "Tools"]
    },
    {
        "blog-id": 17,
        "username": "Chris Wilson",
        "publishing-date": "19 Sep 2023",
        "cover": "",
        "title": "Gamification in product design",
        "description": "Using gamification techniques to boost user engagement.",
        "topics": ["Design", "Gamification", "Engagement"]
    },
    {
        "blog-id": 18,
        "username": "Grace Martin",
        "publishing-date": "7 Oct 2023",
        "cover": "",
        "title": "Sustainable product development",
        "description": "Why sustainability matters in the product development lifecycle.",
        "topics": ["Sustainability", "Development", "Innovation"]
    },
    {
        "blog-id": 19,
        "username": "Matthew Scott",
        "publishing-date": "20 Oct 2023",
        "cover": "",
        "title": "Breaking down the Kanban method",
        "description": "A practical guide to mastering the Kanban method.",
        "topics": ["Kanban", "Project Management", "Efficiency"]
    },
    {
        "blog-id": 20,
        "username": "Sophia White",
        "publishing-date": "5 Nov 2023",
        "cover": "",
        "title": "The future of AR in education",
        "description": "How augmented reality is revolutionizing the learning experience.",
        "topics": ["AR", "Education", "Technology"]
    },
    {
        "blog-id": 21,
        "username": "Jacob Thomas",
        "publishing-date": "17 Nov 2023",
        "cover": "",
        "title": "Inclusive design principles",
        "description": "Creating designs that cater to diverse user needs.",
        "topics": ["Design", "Inclusion", "UX"]
    }
];



function getRecentBlogs(page, res) {
    
    res.send({
        "blogs": blogs.slice((page-1)*6, page*6),
        "maxpages": Math.floor(blogs.length/6) + 1
    })
}

module.exports = getRecentBlogs;