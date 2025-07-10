// Import images
import montrealChurchUrl from '../Pictures/Montreal_Church.png';
import montrealJardinUrl from '../Pictures/Montreal_Jardin.png';
import montrealParkRoyalUrl from '../Pictures/Montreal_ParkRoyal.png';
import montrealDomeUrl from '../Pictures/Montreal_Dome.png';
import montrealOldPortUrl from '../Pictures/Montreal_OldPort.png';
import montrealJeanTalonUrl from '../Pictures/Montreal_JeanTalon.png';
import montrealIslandUrl from '../Pictures/Montreal_Island.png';
import torontoCnUrl from '../Pictures/Toronto_CN.png';
import torontoMuseumUrl from '../Pictures/Toronto_Museum.png'; 
import torontoYorkUrl from '../Pictures/Toronto_York.png';
import torontoIslandsUrl from '../Pictures/Toronto_Islands.png';
import torontoHockeyUrl from '../Pictures/Toronto_Hockey.png';
import torontoZooUrl from '../Pictures/Toronto_Zoo.png';
import torontoBlackCreekUrl from '../Pictures/Toronto_BlackCreek.png';
import quebecPlainsUrl from '../Pictures/Quebec_Plains.png';
import quebecAquariumUrl from '../Pictures/Quebec_Aquarium.png';
import quebecArtUrl from '../Pictures/Quebec_Art.png';
import quebecParliamentUrl from '../Pictures/Quebec_Parliament.png';
import quebecFortificationsUrl from '../Pictures/Quebec_Fortifcations.png';
import quebecTheatreUrl from '../Pictures/Quebec_Theatre.png';
import quebecChamplainUrl from '../Pictures/Quebec_Champlain.png';
import ottawaCanadaUrl from '../Pictures/Ottawa_Canada.png';
import ottawaMintUrl from '../Pictures/Ottawa_Mint.png';
import ottawaSpaceUrl from '../Pictures/Ottawa_Space.png';
import ottawaScienceUrl from '../Pictures/Ottawa_Science.png';
import ottawaHauntedUrl from '../Pictures/Ottawa_Haunted.png';
import ottawaFleaUrl from '../Pictures/Ottawa_Flea.png';
import ottawaArtUrl from '../Pictures/Ottawa_Art.png';


/**
 * Generates special HTML content for specific attractions
 * @param {string} attractionName - The name of the attraction
 * @param {string} city - The city where the attraction is located
 * @returns {string} - HTML content to be added to the attraction panel
 */

export function getSpecialAttractionContent(attractionName, city) {
    // Montreal Attractions
    if (city === "Montreal") {
        if (attractionName === "Notre-Dame Basilica of Montreal") {
            return `
                <div>
                    <img src="${montrealChurchUrl}" alt="Notre-Dame Basilica of Montreal" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.basiliquenotredame.ca/en" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Jardin botanique de Montreal") {
            return `
                <div>
                    <img src="${montrealJardinUrl}" alt="Jardin botanique de Montreal" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://espacepourlavie.ca/jardin-botanique" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Mount Royal Park") {
            return `
                <div>
                    <img src="${montrealParkRoyalUrl}" alt="Mount Royal Park" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://travel.usnews.com/Montreal_Canada/Things_To_Do/Parc_du_Mont_Royal_39174/#:~:text=The%20park%20is%20open%20daily,to%20the%20park%20is%20free." target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Montreal Biodome") {
            return `
                <div>
                    <img src="${montrealDomeUrl}" alt="Montreal Biodome" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://espacepourlavie.ca/en/biodome" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Old Port") {
            return `
                <div>
                    <img src="${montrealOldPortUrl}" alt="Old Port" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.oldportofmontreal.com" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Jean Talon Market") {
        return `
            <div>
                <img src="${montrealJeanTalonUrl}" alt="Jean Talon Market" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
            </div>
            <div style="margin-bottom: 15px;">
                <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.mtl.org/en/what-to-do/food/jean-talon-market-mtl" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
            </div>
        `;
        } else if (attractionName === "St. Helen's Island") {
        return `
            <div>
                <img src="${montrealIslandUrl}" alt="St. Helen's Island" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
            </div>
            <div style="margin-bottom: 15px;">
                <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://greatruns.com/montreal-st-helens-island/" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
            </div>
        `;
        } 
    }

    
    // Toronto Attractions
    else if (city === "Toronto") {
        if (attractionName === "CN Tower") {
            return `
                <div>
                    <img src="${torontoCnUrl}" alt="CN Tower" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.cntower.ca/" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Royal Ontario Museum") {
            return `
                <div>
                    <img src="${torontoMuseumUrl}" alt="Royal Ontario Museum" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.rom.on.ca/?gad_source=1&gclid=Cj0KCQjwnui_BhDlARIsAEo9GusUgorVSrJ-1JTIQLUElnt5CFeEeDRb6pfn775Qqrj5uWN4h8d9FaQaAj7-EALw_wcB&utm_source=google&utm_medium=listing&utm_campaign=branded2024" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Fort York National Historic Site") {
            return `
                <div>
                    <img src="${torontoYorkUrl}" alt="Fort York National Historic Site" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.toronto.ca/explore-enjoy/history-art-culture/museums/fort-york-national-historic-site/" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Toronto Islands") {
            return `
                <div>
                    <img src="${torontoIslandsUrl}" alt="Toronto Islands" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.toronto.ca/explore-enjoy/parks-recreation/places-spaces/beaches-gardens-attractions/toronto-island-park/" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Hockey Hall of Fame") {
            return `
                <div>
                    <img src="${torontoHockeyUrl}" alt="Hockey Hall of Fame" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.hhof.com/" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Toronto Zoo") {
            return `
                <div>
                    <img src="${torontoZooUrl}" alt="Toronto Zoo" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.torontozoo.com//" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "The Village at Black Creek") {
            return `
                <div>
                    <img src="${torontoBlackCreekUrl}" alt="The Village at Black Creek" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.destinationontario.com/en-ca/attractions/the-village-at-black-creek" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        }
    }
    
    // Quebec Attractions
    else if (city === "Quebec") {
        if (attractionName === "The Plains of Abraham") {
            return `
                <div>
                    <img src="${quebecPlainsUrl}" alt="The Plains of Abraham" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.quebec-cite.com/en/businesses/plaines-dabraham" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Aquarium of Quebec") {
            return `
                <div>
                    <img src="${quebecAquariumUrl}" alt="Aquarium of Quebec" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.sepaq.com/ct/paq/index.dot?language_id=1" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Musée national des beaux-arts du Québec") {
            return `
                <div>
                    <img src="${quebecArtUrl}" alt="Musée national des beaux-arts du Québec" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.mnbaq.org/en" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Parliament Building") {
            return `
                <div>
                    <img src="${quebecParliamentUrl}" alt="Parliament Building" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="http://www.ameriquefrancaise.org/en/article-538/The_Parliament_Building_of_Quebec:_A_Place_of_Memory.html" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Fortifications of Quebec National Historic Site") {
            return `
                <div>
                    <img src="${quebecFortificationsUrl}" alt="Fortifications of Quebec National Historic Site" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://parks.canada.ca/lhn-nhs/qc/fortifications" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Grand Théâtre de Québec") {
            return `
                <div>
                    <img src="${quebecTheatreUrl}" alt="Grand Théâtre de Québec" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://grandtheatre.qc.ca/" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Rue du Petit Champlain") {
            return `
                <div>
                    <img src="${quebecChamplainUrl}" alt="Rue du Petit Champlain" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.quebec-cite.com/fr/vieux-quebec/petit-champlain" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        }
    }

    // Ottawa Attractions
    else if (city === "Ottawa") {
        if (attractionName === "Oh Canada Eh!? Dinner Musical") {
            return `
                <div>
                    <img src="${ottawaCanadaUrl}" alt="Oh Canada Eh!? Dinner Musical" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.ohcanadaeh.com/" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Royal Canadian Mint") {
            return `
                <div>
                    <img src="${ottawaMintUrl}" alt="Royal Canadian Mint" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://ottawatourism.ca/en/see-and-do/royal-canadian-mint" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Canada Aviation and Space Museum") {
            return `
                <div>
                    <img src="${ottawaSpaceUrl}" alt="Canada Aviation and Space Museum" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://ingenium.ca/aviation/en/" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Canada Science and Technology Museum") {
            return `
                <div>
                    <img src="${ottawaScienceUrl}" alt="Canada Science and Technology Museum" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://ingenium.ca/scitech/en/" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "Original Haunted Walk of Ottawa") {
            return `
                <div>
                    <img src="${ottawaHauntedUrl}" alt="Original Haunted Walk of Ottawa" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.tripadvisor.ca/AttractionProductReview-g155004-d11474764-Original_Haunted_Walk_of_Ottawa-Ottawa_Ontario.html" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "613 Flea") {
            return `
                <div>
                    <img src="${ottawaFleaUrl}" alt="613 Flea" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.613flea.ca/" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        } else if (attractionName === "National Gallery of Canada") {
            return `
                <div>
                    <img src="${ottawaArtUrl}" alt="National Gallery of Canada" style="width: 100%; height: auto; max-width: 100%; object-fit: contain;">
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Learn more here:</strong> <a href="https://www.gallery.ca/" target="_blank" style="color: #0079c1; text-decoration: underline;">Visit the official website</a></p>
                </div>
            `;
        }
    }

    // Default case - no special content
    return "";
} 