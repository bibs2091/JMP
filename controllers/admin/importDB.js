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
    for (let table in DB) {
        let model = DBtables[table];
        let DBtable = DB[table];
        if (DBtable.length > 0)
            for (let i = 0; i < DBtable.length; i++) {
                delete DBtable[i].id;
                delete DBtable[i].createdAt;
                delete DBtable[i].updatedAt;
                await model.create(DBtable[i]);
            }
    }
    res.redirect("/admin/settings");
}

