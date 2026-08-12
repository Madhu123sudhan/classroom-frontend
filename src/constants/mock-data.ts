import {Subject} from "@/types";

export const mock_subjects: Subject[] = [
    {
        id: 1,
        code: "CSE101",
        name: "Introduction to Programming",
        department: "Computer Science",
        description:
            "Covers programming fundamentals, problem-solving techniques, and basic algorithm design using modern programming languages.",
        createdAt: new Date().toISOString(),

    },
    {
        id: 2,
        code: "ECE205",
        name: "Digital Electronics",
        department: "Electronics & Communication",
        description:
            "Introduces digital logic, combinational and sequential circuits, logic gates, flip-flops, and digital system design.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 3,
        code: "ME301",
        name: "Thermodynamics",
        department: "Mechanical Engineering",
        description:
            "Explores the principles of energy, heat transfer, thermodynamic laws, and their applications in engineering systems.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 4,
        code: "ME102",
        name: "Introduction to Mechanical Concepts",
        department: "Mechanical Engineering",
        description:
            "Covers programming fundamentals, problem-solving techniques, and basic algorithm design using modern programming languages.",
        createdAt: new Date().toISOString(),

    },
    {
        id: 5,
        code: "ECE206",
        name: "Introduction to ECE Concepts",
        department: "Electronics & Communication",
        description:
            "Covers programming fundamentals, problem-solving techniques, and basic algorithm design using modern programming languages.",
        createdAt: new Date().toISOString(),

    }
];