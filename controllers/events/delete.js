const fs = require('fs');
const Sponsor = require('../../models/Sponsors');
const Schedule = require('../../models/Schedule');
const Event = require('../../models/Event');
const EventInscriptions = require('../../models/EventInscriptions');
module.exports = async(req, res) => {
	try{

		
		const sponsors = await Sponsor.findAll(
			{where :
				{
					eventId : req.params.id
				}});
		const schedules = await Schedule.findAll(
			{where :
				{
					eventId : req.params.id
				}
			});
		const eventInscriptions = await EventInscriptions.findAll({where :
			{
				eventId : req.params.id
			}
			});
		for (let i =0;i<sponsors.length;i++){
			if (sponsors[i].log)
				await fs.unlink(__dirname + '/../../public/img/events/sponsors/'+sponsors[i].id+".jpg",()=>{});
			await Sponsor.destroy({
				where :  {
					id:sponsors[i].id
				}
			});
		}
		for (let i =0;i<schedules.length;i++){
			await Schedule.destroy({
				where :  {
					id:schedules[i].id
				}
			});
		}
		for (let i =0;i<eventInscriptions.length;i++){
			await EventInscriptions.destroy({
				where :  {
					id:eventInscriptions[i].id
				}
			});
		}
		await fs.unlink(__dirname + '/../../public/img/events/covers/'+req.params.id+".jpg",()=>{});
		await Event.destroy({
	        where : {
	        	id:req.params.id
	        }
	        });

	    res.redirect('/');
	}
        catch(err){console.log(err);
        	res.redirect('/errors');
        };
}