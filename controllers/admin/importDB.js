const Users = require("../../models/Users");
const UsersInfo = require("../../models/UsersInfo");
const Categories = require("../../models/Categories");
const Chapters = require("../../models/Chapters");
const Courses = require("../../models/Courses");
const Event = require("../../models/Event");
const EventInscription = require("../../models/EventInscriptions");
const InfoSite = require("../../models/InfoSite");
const Lectures = require("../../models/Lectures");
const Progress = require("../../models/Progress");
const Quizs = require("../../models/Quizs");
const Report = require("../../models/Report");
const Suggestions = require("../../models/Suggestions");
const WishLists = require("../../models/WishLists");

module.exports = async (req, res) => {
    var DBtables = {
        Users: Users,
        UsersInfo: UsersInfo,
        Report: Report,
        Courses: Courses,
        WishLists: WishLists,
        Chapters: Chapters,
        Suggestions: Suggestions,
        Quizs: Quizs,
        Lectures: Lectures,
        InfoSite: InfoSite,
        Event: Event,
        Categories: Categories,
        EventInscription: EventInscription,
        Progress: Progress
    }
    var { jsonFile } = req.files;
    var DB = jsonFile.data.toString("utf8");
    var DB = JSON.parse(DB);
    console.log(DB);
    for (let table in DB) {
        console.log(table);

    }
    res.redirect("/admin/settings");
}

