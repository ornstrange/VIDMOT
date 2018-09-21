# Verkefni 2 - WebGL

1.
    * GPU = Graphics Processing Unit, Vélbúnaður sem er sérhannaður til að breyta og vinna með minni sem notast í að birta mynd á skjá.
    
    * Pixels / 'Pixlar' eru litlir punktar sem saman mynda skjá, það er hægt að stjórna lit og birtustigi fyrir hvern og einn.
    
    * Frame buffer er bara ein mynd af ramma, sem inniheldur allar upplýsingar um hvað allir pixlar á skjá eiga gera. Raster-scan er að fara eina línu í einu lárétt yfir allan skjáinn og senda þannig upplýsingar til pixlanna frá hægri til vinstri. Refresh rate er hraðinn sem skjár getur tekið við nýjum römmum til að birta.
    
    * OpenGL er 'forritunartungumál' eða safn sem gerir þér kleift að tala við Skjákort og birta þar með flóknar myndir með miklum hraða, WebGL notast við OpenGL en býður uppá að nota það á vefnum.
2. Þríhyrningar geta aldrei spannað meira en einn flöt. Með kassa væri hægt að teygja hornin á slíkan hátt að hann er ekki samsíða bara einum flöt. Það er fyrir vikið fljótara að breyta öllum formum sem nota fleiri en 3 punkta í þríhyrninga.
3. Þú byrjar með punkta í þrívíðu umhverfi -> hér er breytt staðsetningu þeirra -> þeir eru tengdir saman til að mynda form -> skjákortið reiknar út hvaða pixlar tilheyra hverju formi -> hér er breytt lit þeirra pixla -> þeir eru svo blandaðir saman við það sem er á skjánum og athugað hvort allt sé rétt -> hérna koma þeir út, glaðir litlir pixlar.
4. Transformation fylkin eru notuð til að færa punkta frá a -> b í þrívíðu umhverfi. Þetta virkar þannig með því að færa, snúa og stækka upphafpunkt sem allir punktar voru teiknaðir frá og þar með þeim líka. Þau eru mikilvæg afþví þau bjóða uppá mjög mikið fyrir ódýran reikning.
5. Þeir eru eina leiðin fyrir okkur að færa punkta með transform og lita þá. GLSL er forritunartungumál til þess að gera það.
