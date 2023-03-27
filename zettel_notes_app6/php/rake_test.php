<pre>
    <?php
    
    include('./RAKE-PHP-master/rake.php');
    
    // $rake = new Rake('./RAKE-PHP-master/stoplist_smart.txt');
    $rake = new Rake('./RAKE-PHP-master/stoplist_smart.txt');
    
    // $text = "Diseases affecting the cardiovascular system are called cardiovascular disease.
    // Many of these diseases are called lifestyle diseases because they develop over time and are related to a persons exercise habits, diet, whether they smoke, and other lifestyle choices a person makes. Atherosclerosis is the precursor to many of these diseases. It is where small atheromatous plaques build up in the walls of medium and large arteries. This may eventually grow or rupture to occlude the arteries. It is also a risk factor for acute coronary syndromes, which are diseases that are characterised by a sudden deficit of oxygenated blood to the heart tissue. Atherosclerosis is also associated with problems such as aneurysm formation or splitting (dissection) of arteries.
    // Another major cardiovascular disease involves the creation of a clot, called a thrombus. These can originate in veins or arteries. Deep venous thrombosis, which mostly occurs in the legs, is one cause of clots in the veins of the legs, particularly when a person has been stationary for a long time. These clots may embolise, meaning travel to another location in the body. The results of this may include pulmonary embolus, transient ischaemic attacks, or stroke.
    // Cardiovascular diseases may also be congenital in nature, such as heart defects or persistent fetal circulation, where the circulatory changes that are supposed to happen after birth do not. Not all congenital changes to the circulatory system are associated with diseases, a large number are anatomical variations.
    // ";

    $text = "Criteria of compatibility of a system of linear Diophantine equations, strict inequations, and nonstrict inequations are considered. Upper bounds for components of a minimal set of solutions and algorithms of construction of minimal generating sets of solutions for all types of systems are given.";

    // $text = "Каждая наука имеет свой особый предмет исследования.
    // Так, например, политическая экономия изучает законы развития общественно-производственных,
    // т. е. экономических, отношений людей. Эстетика как наука изучает закономерности развития
    // искусства. Языкознание изучает законы возникновения и развития языка и т. д.
    // Каков же предмет, изучаемый историческим материализмом? Отвечая на этот вопрос, И. В.
    // Сталин пишет: Исторический материализм есть распространение положений диалектического
    // материализма на изучение общественной жизни, применение положений диалектического материализма к явлениям жизни общества, к изучению общества, к изучению истории общества. (И. В. Сталин, Вопросы ленинизма, изд. 11, стр. 535.)
    // Исторический материализм является наукой о наиболее общих законах развития общества.
    // Названные выше общественные науки (политическая экономия, эстетика, языкознание) изучают
    // развитие тех или иных отдельных сторон общественной жизни, определенных видов общественных
    // отношений. Исторический материализм в отличие от этих наук изучает законы развития общества
    // в целом, во взаимодействии всех его сторон. Он дает ответ на вопрос о том, что определяет
    // характер общественного строя, чем обусловливается развитие общества, от чего зависит переход
    // от одного общественного строя к другому, например переход от капитализма к социализму.
    // В отличие от гражданской истории, которая призвана отобразить во всей конкретности ход
    // событий, совершавшихся в общественной жизни отдельных стран и народов, исторический
    // материализм имеет своей задачей исследование общих законов исторического процесса.
    // ";
    
    $phrases = $rake->extract($text);
    
    print_r($phrases);
    
    ?>
</pre>