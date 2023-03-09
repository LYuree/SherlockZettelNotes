import rake from 'rake-js'
// const guessLanguage = require("./node_modules/rake-js/dist/lib/tools/guess_language.js")
// const franc = require("franc");
// console.log('Hey!');

const text2 = `Каждая наука имеет свой особый предмет исследования.
Так, например, политическая экономия изучает законы развития общественно-производственных,
т. е. экономических, отношений людей. Эстетика как наука изучает закономерности развития
искусства. Языкознание изучает законы возникновения и развития языка и т. д.
Каков же предмет, изучаемый историческим материализмом? Отвечая на этот вопрос, И. В.
Сталин пишет: «Исторический материализм есть распространение положений диалектического
материализма на изучение общественной жизни, применение положений диалектического материализма к явлениям жизни общества, к изучению общества, к изучению истории общества». (И. В. Сталин, Вопросы ленинизма, изд. 11, стр. 535.)
Исторический материализм является наукой о наиболее общих законах развития общества.
Названные выше общественные науки (политическая экономия, эстетика, языкознание) изучают
развитие тех или иных отдельных сторон общественной жизни, определенных видов общественных
отношений. Исторический материализм в отличие от этих наук изучает законы развития общества
в целом, во взаимодействии всех его сторон. Он дает ответ на вопрос о том, что определяет
характер общественного строя, чем обусловливается развитие общества, от чего зависит переход
от одного общественного строя к другому, например переход от капитализма к социализму.
В отличие от гражданской истории, которая призвана отобразить во всей конкретности ход
событий, совершавшихся в общественной жизни отдельных стран и народов, исторический
материализм имеет своей задачей исследование общих законов исторического процесса.`


const biology = `The blood circulatory system is a system of organs that includes the heart, blood vessels, and blood which is circulated throughout the entire body of a human or other vertebrate.[1][2] It includes the cardiovascular system, or vascular system, that consists of the heart and blood vessels (from Greek kardia meaning heart, and from Latin vascula meaning vessels). The circulatory system has two divisions, a systemic circulation or circuit, and a pulmonary circulation or circuit.[3] Some sources use the terms cardiovascular system and vascular system interchangeably with the circulatory system.[4]

The network of blood vessels are the great vessels of the heart including large elastic arteries, and large veins; other arteries, smaller arterioles, capillaries that join with venules (small veins), and other veins. The circulatory system is closed in vertebrates, which means that the blood never leaves the network of blood vessels. Some invertebrates such as arthropods have an open circulatory system. Diploblasts such as sponges, and comb jellies lack a circulatory system.

Blood is a fluid consisting of plasma, red blood cells, white blood cells, and platelets that is circulated around the body carrying oxygen and nutrients to the tissues, and waste materials away. Circulated nutrients include proteins and minerals, other components transported are gases such as oxygen, and carbon dioxide, hormones, and hemoglobin; providing nourishment, help in the immune system to fight diseases, and in maintaining homeostasis by stabilizing temperature and natural pH.

In vertebrates, complementary to the circulatory system is the lymphatic system. This system carries excess plasma filtered from the capillaries as interstitial fluid between cells, away from the body tissues in an accessory route to return the excess fluid back to the blood circulation as lymph.[5] The passage of lymph takes much longer than that of blood.[6] The lymphatic system is a subsystem that is essential for the functioning of the blood circulatory system; without it the blood would become depleted of fluid. The lymphatic system works together with the immune system.[7] Unlike the closed circulatory system, the lymphatic system is an open system. Some sources describe it as a secondary circulatory system.

The circulatory system can be affected by many cardiovascular diseases. Cardiologists are medical professionals which specialise in the heart, and cardiothoracic surgeons specialise in operating on the heart and its surrounding areas. Vascular surgeons focus on disorders of the blood vessels, and lymphatic vessels.`


const biology2 = `The function and health of the circulatory system and its parts are measured in a variety of manual and automated ways. These include simple methods such as those that are part of the cardiovascular examination, including the taking of a person's pulse as an indicator of a person's heart rate, the taking of blood pressure through a sphygmomanometer or the use of a stethoscope to listen to the heart for murmurs which may indicate problems with the heart's valves. An electrocardiogram can also be used to evaluate the way in which electricity is conducted through the heart.

Other more invasive means can also be used. A cannula or catheter inserted into an artery may be used to measure pulse pressure or pulmonary wedge pressures. Angiography, which involves injecting a dye into an artery to visualise an arterial tree, can be used in the heart (coronary angiography) or brain. At the same time as the arteries are visualised, blockages or narrowings may be fixed through the insertion of stents, and active bleeds may be managed by the insertion of coils. An MRI may be used to image arteries, called an MRI angiogram. For evaluation of the blood supply to the lungs a CT pulmonary angiogram may be used. Vascular ultrasonography may be used to investigate vascular diseases affecting the venous system and the arterial system including the diagnosis of stenosis, thrombosis or venous insufficiency. An intravascular ultrasound using a catheter is also an option.`



const biology3 = `Diseases affecting the cardiovascular system are called cardiovascular disease.

Many of these diseases are called "lifestyle diseases" because they develop over time and are related to a person's exercise habits, diet, whether they smoke, and other lifestyle choices a person makes. Atherosclerosis is the precursor to many of these diseases. It is where small atheromatous plaques build up in the walls of medium and large arteries. This may eventually grow or rupture to occlude the arteries. It is also a risk factor for acute coronary syndromes, which are diseases that are characterised by a sudden deficit of oxygenated blood to the heart tissue. Atherosclerosis is also associated with problems such as aneurysm formation or splitting ("dissection") of arteries.

Another major cardiovascular disease involves the creation of a clot, called a "thrombus". These can originate in veins or arteries. Deep venous thrombosis, which mostly occurs in the legs, is one cause of clots in the veins of the legs, particularly when a person has been stationary for a long time. These clots may embolise, meaning travel to another location in the body. The results of this may include pulmonary embolus, transient ischaemic attacks, or stroke.

Cardiovascular diseases may also be congenital in nature, such as heart defects or persistent fetal circulation, where the circulatory changes that are supposed to happen after birth do not. Not all congenital changes to the circulatory system are associated with diseases, a large number are anatomical variations.`

let keywords = rake(biology3);
console.log(keywords);



// console.log(guess_language_1.default(text));


// function shieldApostrophes(text){
//     console.log('Loop entered');
//     let i = 0,
//         apoIndex = text.indexOf("'", i);
//     // console.log(apoIndex);
//     // apoIndex = text.indexOf("'", apoIndex+1);
//     // console.log(apoIndex);

//     while(apoIndex != -1){
//         //seems like an eternal loop
//         console.log(apoIndex);
//         text = text.slice(0, apoIndex) + "'" + text.slice(apoIndex);
//         i = apoIndex;
//         apoIndex = text.indexOf("'", apoIndex+1);
//     }
//     return text;
// }

function shieldApostrophes(text){
    text = text.replace(/'/g, "\\'");
    return text;
}


console.log('Hey!');
const text = "markussi's note";
console.log(shieldApostrophes(text));