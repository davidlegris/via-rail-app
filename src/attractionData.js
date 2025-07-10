/**
 * attractionData.js
 * Contains attraction information for left panel
 * Created: 04-21-2025
 * Last Modified: 07-09-2025
 */

// Montreal attractions data
const montrealAttractions = {
    "Montreal Biodome": {
        name: "Montreal Biodome",
        description: "Located at Olympic Park, the Montreal Biodome lets visitors experience all four seasons under one dome. This natural science museum recreates the diverse ecosystems of the Western Hemisphere, from lush spring  landscapes to the starkness of winter forests, visitors can wander through the tropics or observe the icy trees in a chilly replica of the Laurentian Maple Forest. It is the perfect place to explore nature year round.",
    },
    "Old Port": {
        name: "Old Port",
        description: "Stretching over 2 km along the St. Lawrence River, the historic Old Port has come a long way since its days as a fur trading post in 1611. Today, it’s a lively waterfront destination perfect for walking, cycling, rollerblading, and taking in the scenic views. Apart from the meandering paths, this site also offers visitors the chance to visit the Montreal Science Centre or take in the cityscape from atop the iconic Clock Tower.",
    },
    "Notre-Dame Basilica of Montreal": {
        name: "Notre-Dame Basilica of Montreal",
        description: "As a minor basilica of the Catholic Church, the Notre dame basilica is a divine landmark nestled in the heart of Old Montreal. Don’t hymn and haw, this Neo-Gothic masterpiece is a covenant sight to see. Completed in 1829, its beautiful interior features vibrant stained glass windows depicting scenes from Montreal’s religious history, and a starry blue ceiling that’ll leave you saying hallelujah. When it comes to architecture, other places of worship just don’t got nun on this one.",
    },
    "Mount Royal Park": {
        name: "Mount Royal Park",
        description: "As a minor basilica of the Catholic Church, the Notre dame basilica is a divine landmark nestled in the heart of Old Montreal. Don’t hymn and haw, this Neo-Gothic masterpiece is a covenant sight to see. Completed in 1829, its beautiful interior features vibrant stained glass windows depicting scenes from Montreal’s religious history, and a starry blue ceiling that’ll leave you saying hallelujah. When it comes to architecture, other places of worship just don’t got nun on this one.",
    },
    "Jardin botanique de Montreal": {
        name: "Jardin botanique de Montreal",
        description: "Visitors will be weaving through this lush landscape like a vine at the Montreal Botanical Garden. With an impressive greenhouse complex showcasing plants from around the world and equally vast outdoor gardens, it's a breathtaking blend of science and serenity. Whether you're a nature lover or just stopping to smell the roses, this garden is sure to grow on you.",
    },
    "Jean Talon Market": {
        name: "Jean Talon Market",
        description: "Visitors can feast both their eyes and appetites at the vibrant Jean Talon Market, nestled in Montreal’s Little Italy district. Bite into crisp local veggies, savor the season’s juiciest fruits, and gnaw on freshly butchered meats all under one roof. This all-in-one charcuterie supply haven is a rare find and truly a cut above the rest. Visitors bring cash and an empty stomach when visiting this gastronomic delight of a site!",
    },
    "St. Helen's Island": {
        name: "St. Helen's Island",
        description: "Be cast away on an island in the St. Lawrence River, just offshore from Old Montreal. Visitors have a trident of options on this vibrant island, from exploring the tranquil Saint Helen’s Island Forest, to immersing themselves in the eco-wonders of the Biosphere, or indulging in thrills at La Ronde amusement park. And if the timing’s right, Visitors can catch one of the many concerts or shows frequently held on these lively grounds.",
    }
};

// Toronto attractions data
const torontoAttractions = {
    "CN Tower": {
        name: "CN Tower",
        description: "Standing at 553.3 meters tall, this communications and observation tower is located in the heart of downtown Toronto and is one of the city’s most iconic landmarks. A popular tourist destination, it offers breathtaking views and photo opportunities. Visitors can ride to the top to take in panoramic views of Toronto’s skyline. For adrenaline seekers, the tower also features the EdgeWalk which is a thrilling hands-free walk along the outside ledge of the tower’s main pod.",
    },
    "Royal Ontario Museum": {
        name: "Royal Ontario Museum",
        description: "The Royal Ontario Museum is the largest and most visited museum in Canada, drawing over one million visitors each year. It houses a remarkable collection of 18 million artworks, cultural artifacts, and natural history specimens across 40 gallery and exhibition spaces. A must-see destination for history and science enthusiasts, the museum offers something for every visitor.",
    },
    "Fort York National Historic Site": {
        name: "Fort York National Historic Site",
        description: "Built in 1793, Fort York is the site where the pivotal Battle of York was fought in 1813 and won by Canadian soldiers and their allies. Visitors can explore the historic grounds, sift through old records and documents, and feel as if they are stepping back in time. Often referred to as the birthplace of Toronto, Fort York is a must-see destination in the city, offering inspiration through the stories of the heroes who defended the country.",
    },
    "Toronto Islands": {
        name: "Toronto Islands",
        description: "Just a short ferry ride from Toronto’s waterfront, the Toronto Islands offer a peaceful escape from the city. Visitors can take a leisurely walk, have a picnic, ride a bike, or grab a bite to eat while surrounded by vibrant vegetation and scenic views. Choose a ferry or a water taxi, and become immersed with nature without even leaving the city. ",
    },
    "Hockey Hall of Fame": {
        name: "Hockey Hall of Fame",
        description: "This gem is a real hat trick for all hockey lovers, players, and their wives. The museum features a Range(r) of exhibits, including National Hockey League records, memorabilia, along with individual player and team collections. Visitors can feel like Kings as they explore the Hall of NHL Trophies. With its interactive exhibits and rich history, this museum guarantees you'll never have the Blues!",
    },
    "Toronto Zoo": {
        name: "Toronto Zoo",
        description: "Enter the habitat of Canada's largest zoo at the Toronto Zoo established 1974. Home to over 5,000 animals and welcoming more than 1.2 million visitors each year, it’s the purr-fect place to spend the day. Visitors can explore diverse habitats from around the world, and also unleash their inner apex predator in the lines for concessions, as there’s a whole food chain of tasty bites waiting to be hunted down.",
    },
    "The Village at Black Creek": {
        name: "The Village at Black Creek",
        description: "A step forward into the Village at Black Creek and travel back in time. Opened in 1960 and resembling the 1860s this immersive heritage museum offers visitors the chance to experience pioneer life. Learn the ways of pioneers by exploring the scenic grounds and hearing fables of the past.",
    }
};

// Ottawa attractions data
const ottawaAttractions = {
    "Oh Canada Eh!? Dinner Musical": {
        name: "Oh Canada Eh!? Dinner Musical",
        description: "Visitors will dine on a hearty 5-course meal while taking in a blunstone-tapping musical tribute to Canadian history, folklore, and all things maple flavored. From lumberjacks to Monties, the house hippo, and nanaimo bars, this musical celebration will have you saying “sorry” for not coming sooner. By the end it will have any patron feeling like a true canuck. So visitors, dress in your finest Canadian tuxedo because this event is a moose-t see",
    },
    "Royal Canadian Mint": {
        name: "Royal Canadian Mint",
        description: "Visitors spare some change for this gold standard tour of the Royal Canadian Mint. Since 1908, this iconic spot has crafted coins and history. Visitors can learn about the art and science of coin making and catch a glimpse of the world's largest coin and gold bars on display. No need to flip a coin - this Mint is pure gold.",
    },
    "Canada Aviation and Space Museum": {
        name: "Canada Aviation and Space Museum",
        description: "Whether you're an aviation buff, a pilot, the pilots family, or the pilots' other family this museum is sure to thrill all. Home to over 130 aircrafts and artifacts, this museum showcases Canada’s cosmic aviation history from civil and military to cutting edge aerospace technology. Learn about aviation history from pre-World War 1 til today and explore Canada’s contributions to space exploration.",
    },
    "Canada Science and Technology Museum": {
        name: "Canada Science and Technology Museum",
        description: "Login to a world of innovation at the Canada Science and Technology Museum, where the country’s scientific and technology history are stored. Locally storing over 20,000 artifacts and 60,000 individual objects, the collections and exhibits are vast.This highly interactive museum invites visitors of all ages to analyze, visualize, and explore. The intelligence visitors will learn here will not be artificial, but the real deal.",
    },
    "Original Haunted Walk of Ottawa": {
        name: "Original Haunted Walk of Ottawa",
        description: "Join a moonlit haunted walk through Ottawa’s eeriest streets, led by a lantern bearing specter. Explore chilling sites like the Rideau Canal, the historic Commissariat Building, and other haunted landmarks. Along the way, uncover tales from Ottawa’s macabre past ghostly, gruesome, and unforgettable. Dead or alive, this walk is to die for.",
    },
    "613 Flea": {
        name: "613 Flea",
        description: "613 Flea is the perfect blend of artisanal finds and local pop-ups, offering flea market classics, from that one Jewel CD, to up-sold Temu jewelry, to fruit-flavored hot sauces you’ll weirdly want to try. It’s a treasure hunt in every aisle and a must-visit for anyone who loves a good market dig. Grab one of your many tote bags and drop by, you never know what you'll walk out with!",
    },
    "National Gallery of Canada": {
        name: "National Gallery of Canada",
        description: "Established in 1880 and now relocated along Sussex Drive near the Ottawa River, the National Gallery of Canada is home to over 93,000 works of art. From classic masterpieces to questionable modern works, this gallery gives visitors countless chances to nod thoughtfully and pretend they understand the deeper meaning. Whether you're an art lover, like to act pretentious, or just here for the giant spider out front, this museum is a must see.",
    }
};

// Quebec attractions data
const quebecAttractions = {
    "The Plains of Abraham": {
        name: "The Plains of Abraham",
        description: "The Plains of Abraham, once home to a consequential battle between French and British forces during the Seven Years War, now serves as an urban park in the centre of Quebec City where visitors can enjoy trails, gardens and other outdoor activities. The park is also home to the Plains of Abraham Museum, where visitors can learn about military history.",
    },
    "Aquarium of Quebec": {
        name: "Aquarium of Quebec",
        description: "The Aquarium of Quebec is a large aquarium located on the St. Lawrence River in Quebec City. The Aquarium is home to around 10000 animals, with 300 different species of fish, amphibians, invertebrates and aquatic mammals! Indoor and outdoor exhibits make the Aquarium of Quebec a wonderful destination to visit throughout the year!",
    },
    "Fortifications of Quebec National Historic Site": {
        name: "Fortifications of Quebec National Historic Site",
        description: "The Fortifications of Quebec National Historic Site is a portion of the Historic District of Old Quebec, a designated UNESCO World Heritage Site. Stretching for nearly 4.6 km, the fortification is the only remaining fortified city wall north of the Rio Grande River and provides a great panoramic view of Quebec City",
    },
    "Musée national des beaux-arts du Québec": {
        name: "Musée national des beaux-arts du Québec",
        description: "Located inside the Plains of Abraham of Quebec City, the Musée national des beaux-arts du Québec contains Quebec artwork stretching back to the 17th century. Holding more than 40,000 pieces of art, visitors have the option to pursue sculptures, paintings and decorative art in this beautiful complex.",
    },
    "Grand Théâtre de Québec": {
        name: "Grand Théâtre de Québec",
        description: "The Grand Théâtre de Québec is a performing arts venue located in the heart of Quebec City. Visitors to the Grand Théâtre de Québec can enjoy a variety of programming including opera, theatre, music and dance performances. The Grand Théâtre de Québec serves as the home of both the Orchestre symphonique de Québec and the Opéra de Québec.",
    },
    "Parliament Building": {
        name: "Parliament Building",
        description: "Home to the National Assembly of Quebec, the Parliament Building was constructed between 1877 and 1886. It houses the Quebec government and is a key site for political activity in the province. Visitors can take guided or self-guided tours to learn about the building's history, significant events, and landmark cases, as well as admire its impressive architectural design.",
    },
    "Rue du Petit Champlain": {
        name: "Rue du Petit Champlain",
        description: "Claimed to be the oldest commercial district in North America, Rue du Petit-Champlain is the perfect spot for a shopping spree or for saying “that’s so cute!” before putting it back and leaving the shop. Nestled at the base of Cap Diamant in Old Québec, this picturesque street is lined with boutiques, bistros, and cobblestone charm. This is a shopaholic's dream!",
    }
};

// Function to get attraction information by name and city
export function getAttractionInfo(attractionName, city) {
    let attractions;
    
    // Select the appropriate attractions data based on the city
    switch(city) {
        case "Montreal":
            attractions = montrealAttractions;
            break;
        case "Toronto":
            attractions = torontoAttractions;
            break;
        case "Quebec":
            attractions = quebecAttractions;
            break;
        case "Ottawa":
            attractions = ottawaAttractions;
            break;  
        default:
            return null;
    }
    
    // Return the attraction information if it exists
    return attractions[attractionName] || null;
};

// Export the attractions data for potential direct access
export { montrealAttractions, torontoAttractions, quebecAttractions, ottawaAttractions }; 