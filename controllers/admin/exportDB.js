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
    var data = {};
    data.Users = await Users.findAll();
    data.Categories = await Categories.findAll();
    data.UsersInfo = await UsersInfo.findAll();
    data.Event = await Event.findAll();
    data.Lectures = await Lectures.findAll();
    data.EventInscription = await EventInscription.findAll();
    data.Courses = await Courses.findAll();
    data.Chapters = await Chapters.findAll();
    data.Suggestions = await Suggestions.findAll();
    data.WishLists = await WishLists.findAll();
    data.InfoSite = await InfoSite.findAll();
    data.Progress = await Progress.findAll();
    data.Quizs = await Quizs.findAll();
    data.Report = await Report.findAll();

    console.log(data);

    res.setHeader('Content-type', "application/octet-stream");
    res.setHeader('Content-disposition', 'attachment; filename=db.json');
    res.send(JSON.stringify(data));
}

