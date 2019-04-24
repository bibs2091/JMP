const fs = require('fs');
const Event = require('../../models/Event');
module.exports = async(req, res) => {
	try{

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