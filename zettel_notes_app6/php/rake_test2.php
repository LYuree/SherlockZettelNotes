<pre>
    <?php
    
    require '.\rake-php-plus-master\src\AbstractStopwordProvider.php';
    require '.\rake-php-plus-master\src\ILangParseOptions.php';
    require '.\rake-php-plus-master\src\LangParseOptions.php';
    require '.\rake-php-plus-master\src\StopwordArray.php';
    require '.\rake-php-plus-master\src\StopwordsPatternFile.php';
    require '.\rake-php-plus-master\src\StopwordsPHP.php';
    require '.\rake-php-plus-master\src\RakePlus.php';
    
    use DonatelloZa\RakePlus\RakePlus;
    
    $text = "Criteria of compatibility of a system of linear Diophantine equations, " .
        "strict inequations, and nonstrict inequations are considered. Upper bounds " .
        "for components of a minimal set of solutions and algorithms of construction " .
        "of minimal generating sets of solutions for all types of systems are given.";
    
    $phrases = RakePlus::create($text, "en_US")->get();
    
    print_r($phrases);
    // echo (extension_loaded('mbstring')) ? "true" : "false"; //true
    

    // $text = "Каждая наука имеет свой особый предмет исследования.
    // Так, например, политическая экономия изучает законы развития общественно-производственных,
    // т. е. экономических, отношений людей. Эстетика как наука изучает закономерности развития
    // искусства. Языкознание изучает законы возникновения и развития языка и т. д.
    // Каков же предмет, изучаемый историческим материализмом? Отвечая на этот вопрос, И. В.
    // Сталин пишет: «Исторический материализм есть распространение положений диалектического
    // материализма на изучение общественной жизни, применение положений диалектического материализма к явлениям жизни общества, к изучению общества, к изучению истории общества». (И. В. Сталин, Вопросы ленинизма, изд. 11, стр. 535.)
    // Исторический материализм является наукой о наиболее общих законах развития общества.
    // Названные выше общественные науки (политическая экономия, эстетика, языкознание) изучают
    // развитие тех или иных отдельных сторон общественной жизни, определенных видов общественных
    // отношений. Исторический материализм в отличие от этих наук изучает законы развития общества
    // в целом, во взаимодействии всех его сторон. Он дает ответ на вопрос о том, что определяет
    // характер общественного строя, чем обусловливается развитие общества, от чего зависит переход
    // от одного общественного строя к другому, например переход от капитализма к социализму.
    // В отличие от гражданской истории, которая призвана отобразить во всей конкретности ход
    // событий, совершавшихся в общественной жизни отдельных стран и народов, исторический
    // материализм имеет своей задачей исследование общих законов исторического процесса.";

// Note: en_US is the default language.
    $rake = RakePlus::create($text, 'ru_RU');

    // 'asc' is optional and is the default sort order
    $phrases = $rake->sort('asc')->get();
    // print_r($phrases);




    ?>
</pre>