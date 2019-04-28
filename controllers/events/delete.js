const fs = require('fs');
const Sponsor = require('../../models/Sponsors');
const Event = require('../../models/Event');
module.exports = async(req, res) => {
	try{

		
		const sponsors = await Sponsor.findAll(
			{where :
				{
					eventId : req.params.id
				}})
		for (let i =0;i<sponsors.length;i++){
			await fs.unlink(__dirname + '/../../public/img/events/sponsors/'+sponsors[i].id+".jpg",()=>{});
			await Sponsor.destroy({
				where :  {
					id:sponsors[i].id
				}
			});
		}
		await fs.unlink(__dirname + '/../../public/img/events/plannings/'+req.params.id+".jpg",()=>{});
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