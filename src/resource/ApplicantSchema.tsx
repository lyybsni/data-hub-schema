import {TreeNode} from "../components/SchemaTree/TreeNode";

export const ApplicantSchema: TreeNode = {

    id: "root",
    name: "Applicant",
    path: "Applicant",

    children: [
        {
            id: "applicantId",
            name: "applicantId",
            path: "Applicant.applicantId",
        },
        {
            id: "name",
            name: "name",
            path: "Applicant.name",
        },
        {
            id: "email",
            name: "email",
            path: "Applicant.email",
        },
        {
            id: "phone",
            name: "phone",
            path: "Applicant.phone",
        },
        {
            id: "address",
            name: "address",
            path: "Applicant.address",
            children: [
                {
                    id: "street",
                    name: "street",
                    path: "Applicant.address.street",
                },
                {
                    id: "city",
                    name: "city",
                    path: "Applicant.address.city",
                },
                {
                    id: "state",
                    name: "state",
                    path: "Applicant.address.state",
                },
                {
                    id: "zip",
                    name: "zip",
                    path: "Applicant.address.zip",
                },
            ]
        },
        {
            id: "education",
            name: "education",
            path: "Applicant.education",
            children: [
                {
                    id: "school",
                    name: "school",
                    path: "Applicant.education.school",
                },
                {
                    id: "degree",
                    name: "degree",
                    path: "Applicant.education.degree",
                },
                {
                    id: "graduationDate",
                    name: "graduationDate",
                    path: "Applicant.education.graduationDate",
                },
            ]
        },
        {
            id: "workExperience",
            name: "workExperience",
            path: "Applicant.workExperience",
            children: [
                {
                    id: "company",
                    name: "company",
                    path: "Applicant.workExperience.company",
                },
                {
                    id: "title",
                    name: "title",
                    path: "Applicant.workExperience.title",
                },
                {
                    id: "startDate",
                    name: "startDate",
                    path: "Applicant.workExperience.startDate",
                },
                {
                    id: "endDate",
                    name: "endDate",
                    path: "Applicant.workExperience.endDate",
                },
            ]
        },
        {
            id: "skills",
            name: "skills",
            path: "Applicant.skills",
            children: [
                {
                    id: "skill",
                    name: "skill",
                    path: "Applicant.skills.skill",
                },
            ]
        }
    ]

}