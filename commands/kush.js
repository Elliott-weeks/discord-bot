const config = require('../config.json');
const request = require('../utils/requests');

module.exports = {
    name: "kush",
    description: "search all of your weed strain needs",
    async execute(message, args) {
        const url = ("https://strainapi.evanbusse.com/"+config.STRAIN_KEY+"/strains/search/name/"+args.join(" ")).toString();
        const data = await request.getRequest(url, undefined);
        if(data.length != 0){
            let fields =[];
            for(i=0;i< data.length;i++){
                let desc = data[i].desc != null? data[i].desc:"Description could not be found";
                let results={name: data[i].name,value: "Race: " + data[i].race + "\n" + "Description: " + desc}
                fields.push(results);
            }

            message.channel.send({embed: {
                color: 32768,
                title: "Your kush is my command",
                description: "The list of your kush search",
                fields: fields,
                timestamp: new Date(),
                
              }
            });
          
        }else{
            message.channel.send("Cant find this strain bruvva!! Try looking in SNOOP DOG's basement");

        }
      
    }
  };
  