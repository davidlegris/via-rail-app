/**
 * stopData..js
 * Contains information about train stops
 * Created: 04-16-2025
 * Last Modified: 07-09-2025
 * Authors: Wanquan Zhao, Hannah Zelko, David Legris
 * @param {string} stop_name - The name of the train stop
 * @returns {Object} - An object containing information about the stop, or null if the stop is not found
 */


export function getStopInfo(stop_name) {
    
    // Default values
    let description = "Train station information";
    let facilities = "Standard facilities available";
    let connections = "Various connections available";
    let province = "Ontario or Quebec";
    
    // Conditional logic for specific stops
    if (stop_name === "Alexandria") {
        province = "Ontario";
        description = "Alexandria is a small town in Ontario with a historic train station.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Local bus service";
    
    } else if (stop_name === "Niagara Falls") {
        province = "Ontario";
        description = "Niagara Falls is a city in Ontario known for its famous waterfalls.";
        facilities = "Restrooms, waiting area, ticket counter, information center";
        connections = "GO Transit, local bus service";
       
    } else if (stop_name === "Sarnia") {    
        province = "Ontario";
        description = "Sarnia is a city in southwestern Ontario on the border with Michigan.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Local bus service";
       
    } else if (stop_name === "Saint-Lambert") {
        province = "Quebec";
        description = "Saint-Lambert is a suburb of Montreal in Quebec.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Exo commuter rail, local bus service";
       
    } else if (stop_name === "Brockville") {    
        province = "Ontario";
        description = "Brockville is a city in eastern Ontario on the St. Lawrence River.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Local bus service";
    
    } else if (stop_name === "Malton") {
        province = "Ontario";
        description = "Malton is a neighborhood in Mississauga, Ontario near Toronto Pearson Airport.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, local bus service";
       
    } else if (stop_name === "Oakville") {
        province = "Ontario";
        description = "Oakville is a town in the Greater Toronto Area.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, local bus service";

    } else if (stop_name === "Dorval") {
        province = "Quebec";
        description = "Dorval is a suburb of Montreal in Quebec.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Exo commuter rail, local bus service";

    } else if (stop_name === "Georgetown") {
        province = "Ontario";
        description = "Georgetown is a town in the Greater Toronto Area.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, local bus service";
    
    } else if (stop_name === "London") {
        province = "Ontario";
        description = "London is a city in southwestern Ontario.";
        facilities = "Restrooms, waiting area, ticket counter, café";
        connections = "GO Transit, local bus service";
        
    } else if (stop_name === "Grimsby") {
        province = "Ontario";
        description = "Grimsby is a town in the Niagara Region of Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, local bus service";

    } else if (stop_name === "Ottawa") {    
        province = "Ontario";
        description = "Ottawa is the capital city of Canada.";
        facilities = "Restrooms, waiting area, ticket counter, café";
        connections = "OC Transpo, O-Train";
        
    } else if (stop_name === "Charny") {
        province = "Quebec";
        description = "Charny is a suburb of Quebec City.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Exo commuter rail, local bus service";

    } else if (stop_name === "Niagara Falls Station") {
        province = "Ontario";
        description = "Niagara Falls Station is the main train station in Niagara Falls, Ontario.";
        facilities = "Restrooms, waiting area, ticket counter, information center";
        connections = "GO Transit, local bus service";

    } else if (stop_name === "Sainte-Foy") {
        province = "Quebec";
        description = "Sainte-Foy is a suburb of Quebec City.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Exo commuter rail, local bus service";

    } else if (stop_name === "Quebec") {
        province = "Quebec";
        description = "Quebec City is the capital of the province of Quebec.";
        facilities = "Restrooms, waiting area, ticket counter, café";
        connections = "RTC bus service, Exo commuter rail";

    } else if (stop_name === "Smiths Falls") {
        province = "Ontario";
        description = "Smiths Falls is a town in eastern Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Local bus service";

    } else if (stop_name === "Windsor") {
        province = "Ontario";
        description = "Windsor is a city in southwestern Ontario across from Detroit.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Transit Windsor, local bus service";
        
    } else if (stop_name === "Stratford") {
        province = "Ontario";
        description = "Stratford is a city in southwestern Ontario known for its Shakespeare Festival.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, local bus service";

    } else if (stop_name === "Guildwood") {
        province = "Ontario";
        description = "Guildwood is a neighborhood in Scarborough, Toronto.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, TTC";

    } else if (stop_name === "Amsterdam") {
        province = "Ontario";
        description = "Amsterdam is a city in central New York.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Amtrak, local bus service";

    } else if (stop_name === "St. Catharines") {
        province = "Ontario";
        description = "St. Catharines is a city in the Niagara Region of Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, local bus service";

    } else if (stop_name === "Albany") {
        province = "Ontario";
        description = "Albany is the capital of New York State.";
        facilities = "Restrooms, waiting area, ticket counter, café";
        connections = "Amtrak, local bus service";

    } else if (stop_name === "St. Marys") {
        province = "Ontario";
        description = "St. Marys is a town in southwestern Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Local bus service";

    } else if (stop_name === "Strathroy") {
        province = "Ontario";
        description = "Strathroy is a town in southwestern Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Local bus service";

    } else if (stop_name === "Brampton") {
        province = "Ontario";
        description = "Brampton is a city in the Greater Toronto Area.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, local bus service";

    } else if (stop_name === "Ingersoll") {
        province = "Ontario";
        description = "Ingersoll is a town in southwestern Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Local bus service";

    } else if (stop_name === "Gananoque") {
        province = "Ontario";
        description = "Gananoque is a town in eastern Ontario on the St. Lawrence River.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Local bus service";

    } else if (stop_name === "Guelph") {
        province = "Ontario";
        description = "Guelph is a city in southwestern Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, local bus service";

    } else if (stop_name === "Glencoe") {
        province = "Ontario";
        description = "Glencoe is a village in southwestern Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Local bus service";

       
    } else if (stop_name === "Belleville") {
        province = "Ontario";
        description = "Belleville is a city in southeastern Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, local bus service";

    } else if (stop_name === "Trenton Junction") {
        province = "Ontario";
        description = "Trenton Junction is a train station in Trenton, Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, local bus service";

    } else if (stop_name === "Casselman") {
        province = "Ontario";
        description = "Casselman is a village in eastern Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Local bus service";

    } else if (stop_name === "Utica") {
        province = "Ontario";
        description = "Utica is a city in central New York.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Amtrak, local bus service";

    } else if (stop_name === "Oshawa") {
        province = "Ontario";
        description = "Oshawa is a city in the Greater Toronto Area.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, local bus service";
 
    } else if (stop_name === "Drummondville") {
        province = "Quebec";
        description = "Drummondville is a city in central Quebec.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Exo commuter rail, local bus service";

    } else if (stop_name === "Saint-Hyacinthe") {
        province = "Quebec";
        description = "Saint-Hyacinthe is a city in southwestern Quebec.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Exo commuter rail, local bus service";

    } else if (stop_name === "Brantford") {
        province = "Ontario";
        description = "Brantford is a city in southwestern Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, local bus service";
 
    } else if (stop_name === "Aldershot") {
        province = "Ontario";
        description = "Aldershot is a neighborhood in Burlington, Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, local bus service";

    } else if (stop_name === "Port Hope") {
        province = "Ontario";
        description = "Port Hope is a town in southeastern Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, local bus service";

    } else if (stop_name === "Buffalo (Depew)") {
        province = "Ontario";
        description = "Buffalo Depew Station is a train station in Depew, New York.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Amtrak, local bus service";

    } else if (stop_name === "Coteau") {
        province = "Quebec";
        description = "Coteau is a village in southwestern Quebec.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Exo commuter rail, local bus service";

    } else if (stop_name === "Croton-Harmon") {
        province = "Ontario";
        description = "Croton-Harmon is a hamlet in Westchester County, New York.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Metro-North Railroad, Amtrak, local bus service";

    } else if (stop_name === "Wyoming") {
        province = "Ontario";
        description = "Wyoming is a village in southwestern Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Local bus service";

    } else if (stop_name === "Woodstock") {
        province = "Ontario";
        description = "Woodstock is a city in southwestern Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, local bus service";
    

    } else if (stop_name === "Kingston") {
        province = "Ontario";
        description = "Kingston is a city in southeastern Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, local bus service";

    } else if (stop_name === "Toronto") {
        description = "Toronto is Canada's largest city and a major railway hub.";
        facilities = "Restrooms, waiting area, ticket counter, food court";
        connections = "TTC subway, GO Transit, UP Express";
        
    } else if (stop_name === "Montreal") {
        province = "Quebec";
        description = "Montréal is the second-largest city in Canada.";
        facilities = "Restrooms, waiting area, ticket counter, café";
        connections = "STM metro, commuter rail";
        
    } else if (stop_name === "Rhinecliff") {
        province = "Ontario";
        description = "Rhinecliff is a hamlet in Dutchess County, New York.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Amtrak, local bus service";
      
    } else if (stop_name === "Kitchener") {
        province = "Ontario";
        description = "Kitchener is a city in southwestern Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "GO Transit, local bus service";
     
    } else if (stop_name === "Chatham") {
        province = "Ontario";
        description = "Chatham is a city in southwestern Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Local bus service";
        
    } else if (stop_name === "Cobourg") {
        province = "Ontario";
        description = "Cobourg is a town located in southern Ontario, along the north shore of Lake Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "VIA Rail, local taxi service";
        
    } else if (stop_name === "Napanee") {
        province = "Ontario";
        description = "Napanee is a small town in eastern Ontario, known for its historic charm.";
        facilities = "Waiting area, ticket kiosk";
        connections = "VIA Rail, local bus service";
       
    } else if (stop_name === "Fallowfield") {
        province = "Ontario";
        description = "Fallowfield is a transit station located in the west end of Ottawa, Ontario.";
        facilities = "Restrooms, waiting area, ticket counter, parking";
        connections = "VIA Rail, OC Transpo bus service";
            
    } else if (stop_name === "Cornwall") {
        province = "Ontario";
        description = "Cornwall is a city in eastern Ontario.";
        facilities = "Restrooms, waiting area, ticket counter";
        connections = "Local bus service";
        
    } else {
        // If the stop is not in our conditional list, return null
        return null;
    }
    
    // Return the stop information
    return {
        province,
        description,
        facilities,
        connections
    };
}
