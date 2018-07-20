const Species = [
  { name: 'Acyrthosiphon pisum', value: 'apisum' },
  { name: 'Aedes aegypti', value: 'aaegypti' },
  { name: 'Aegilops tauschii', value: 'atauschii' },
  { name: 'Ailuropoda melanoleuca', value: 'amelanoleuca' },
  { name: 'Amborella trichopoda', value: 'atrichopoda' },
  { name: 'Amphimedon queenslandica', value: 'aqueenslandica' },
  { name: 'Anas platyrhynchos', value: 'aplatyrhynchos' },
  { name: 'Anolis carolinensis', value: 'acarolinensis' },
  { name: 'Anopheles darlingi', value: 'adarlingi' },
  { name: 'Anopheles gambiae', value: 'agambiae' },
  { name: 'Apis mellifera', value: 'amellifera' },
  { name: 'Arabidopsis lyrata', value: 'alyrata' },
  { name: 'Arabidopsis thaliana', value: 'athaliana' },
  { name: 'Ashbya gossypii', value: 'agossypii' },
  { name: 'Aspergillus clavatus', value: 'aclavatus' },
  { name: 'Aspergillus flavus', value: 'aflavus' },
  { name: 'Aspergillus fumigatus', value: 'afumigatus' },
  { name: 'Aspergillus fumigatusa1163', value: 'afumigatusa1163' },
  { name: 'Aspergillus nidulans', value: 'anidulans' },
  { name: 'Aspergillus niger', value: 'aniger' },
  { name: 'Aspergillus oryzae', value: 'aoryzae' },
  { name: 'Aspergillus terreus', value: 'aterreus' },
  { name: 'Astyanax mexicanus', value: 'amexicanus' },
  { name: 'Atta cephalotes', value: 'acephalotes' },
  { name: 'Blumeria graminis f. sp. hordei DH14', value: 'bgraminis' },
  { name: 'Bombyx mori', value: 'bmori' },
  { name: 'Bos taurus', value: 'btaurus' },
  { name: 'Botrytis cinerea', value: 'bcinerea' },
  { name: 'Brachypodium distachyon', value: 'bdistachyon' },
  { name: 'Brassica oleracea', value: 'boleracea' },
  { name: 'Brassica rapa', value: 'brapa' },
  { name: 'Brugia malayi', value: 'bmalayi' },
  { name: 'Caenorhabditis brenneri', value: 'cbrenneri' },
  { name: 'Caenorhabditis briggsae', value: 'cbriggsae' },
  { name: 'Caenorhabditis elegans', value: 'celegans' },
  { name: 'Caenorhabditis japonica', value: 'cjaponica' },
  { name: 'Caenorhabditis remanei', value: 'cremanei' },
  { name: 'Callithrix jacchus', value: 'cjacchus' },
  { name: 'Canis familiaris', value: 'cfamiliaris' },
  { name: 'Capitella teleta', value: 'cteleta' },
  { name: 'Cavia porcellus', value: 'cporcellus' },
  { name: 'Chlamydomonas reinhardtii', value: 'creinhardtii' },
  { name: 'Chlorocebus sabaeus', value: 'csabaeus' },
  { name: 'Choloepus hoffmanni', value: 'choffmanni' },
  { name: 'Ciona intestinalis', value: 'cintestinalis' },
  { name: 'Ciona savignyi', value: 'csavignyi' },
  { name: 'Colletotrichum gloeosporioides', value: 'cgloeosporioides' },
  { name: 'Colletotrichum graminicola', value: 'cgraminicola' },
  { name: 'Colletotrichum higginsianum', value: 'chigginsianum' },
  { name: 'Colletotrichum orbiculare', value: 'corbiculare' },
  { name: 'Crassostrea gigas', value: 'cgigas' },
  { name: 'Cryptococcus neoformans', value: 'cneoformans' },
  { name: 'Culex quinquefasciatus', value: 'cquinquefasciatus' },
  { name: 'Cyanidioschyzon merolae', value: 'cmerolae' },
  { name: 'Danaus plexippus', value: 'dplexippus' },
  { name: 'Danio rerio', value: 'drerio' },
  { name: 'Daphnia pulex', value: 'dpulex' },
  { name: 'Dasypus novemcinctus', value: 'dnovemcinctus' },
  { name: 'Dendroctonus ponderosae', value: 'dponderosae' },
  { name: 'Dipodomys ordii', value: 'dordii' },
  { name: 'Dothistroma septosporum', value: 'dseptosporum' },
  { name: 'Drosophila ananassae', value: 'dananassae' },
  { name: 'Drosophila erecta', value: 'derecta' },
  { name: 'Drosophila grimshawi', value: 'dgrimshawi' },
  { name: 'Drosophila melanogaster', value: 'dmelanogaster' },
  { name: 'Drosophila mojavensis', value: 'dmojavensis' },
  { name: 'Drosophila persimilis', value: 'dpersimilis' },
  { name: 'Drosophila pseudoobscura', value: 'dpseudoobscura' },
  { name: 'Drosophila sechellia', value: 'dsechellia' },
  { name: 'Drosophila simulans', value: 'dsimulans' },
  { name: 'Drosophila virilis', value: 'dvirilis' },
  { name: 'Drosophila willistoni', value: 'dwillistoni' },
  { name: 'Drosophila yakuba', value: 'dyakuba' },
  { name: 'Echinops telfairi', value: 'etelfairi' },
  { name: 'Equus caballus', value: 'ecaballus' },
  { name: 'Erinaceus europaeus', value: 'eeuropaeus' },
  { name: 'Felis catus', value: 'fcatus' },
  { name: 'Ficedula albicollis', value: 'falbicollis' },
  { name: 'Fusarium fujikuroi', value: 'ffujikuroi' },
  { name: 'Fusarium graminearum', value: 'fgraminearum' },
  { name: 'Fusarium oxysporum', value: 'foxysporum' },
  { name: 'Fusarium pseudograminearum', value: 'fpseudograminearum' },
  { name: 'Fusarium solani', value: 'fsolani' },
  { name: 'Fusarium verticillioides', value: 'fverticillioides' },
  { name: 'Gadus morhua', value: 'gmorhua' },
  { name: 'Gaeumannomyces graminis', value: 'ggraminis' },
  { name: 'Gallus gallus', value: 'ggallus' },
  { name: 'Gasterosteus aculeatus', value: 'gaculeatus' },
  { name: 'Glycine max', value: 'gmax' },
  { name: 'Gorilla gorilla', value: 'ggorilla' },
  { name: 'Heliconius melpomene', value: 'hmelpomene' },
  { name: 'Helobdella robusta', value: 'hrobusta' },
  { name: 'Homo sapiens', value: 'hsapiens' },
  { name: 'Hordeum vulgare', value: 'hvulgare' },
  { name: 'Ictidomys tridecemlineatus', value: 'itridecemlineatus' },
  { name: 'Ixodes scapularis', value: 'iscapularis' },
  { name: 'Komagataella pastoris', value: 'kpastoris' },
  { name: 'Latimeria chalumnae', value: 'lchalumnae' },
  { name: 'Leersia perrieri', value: 'lperrieri' },
  { name: 'Lepisosteus oculatus', value: 'loculatus' },
  { name: 'Leptosphaeria maculans', value: 'lmaculans' },
  { name: 'Loa loa', value: 'lloa' },
  { name: 'Lottia gigantea', value: 'lgigantea' },
  { name: 'Loxodonta africana', value: 'lafricana' },
  { name: 'Macaca mulatta', value: 'mmulatta' },
  { name: 'Macropus eugenii', value: 'meugenii' },
  { name: 'Magnaporthe oryzae', value: 'moryzae' },
  { name: 'Magnaporthe poae', value: 'mpoae' },
  { name: 'Medicago truncatula', value: 'mtruncatula' },
  { name: 'Megaselia scalaris', value: 'mscalaris' },
  { name: 'Melampsora larici-populina 98AG31', value: 'mlaricipopulina' },
  { name: 'Meleagris gallopavo', value: 'mgallopavo' },
  { name: 'Melitaea cinxia', value: 'mcinxia' },
  { name: 'Microbotryum violaceum p1A1 Lamole', value: 'mviolaceum' },
  { name: 'Microcebus murinus', value: 'mmurinus' },
  { name: 'Mnemiopsis leidyi', value: 'mleidyi' },
  { name: 'Monodelphis domestica', value: 'mdomestica' },
  { name: 'Mus musculus', value: 'mmusculus' },
  { name: 'Musa acuminata', value: 'macuminata' },
  { name: 'Mustela putorius furo', value: 'mfuro' },
  { name: 'Myotis lucifugus', value: 'mlucifugus' },
  { name: 'Nasonia vitripennis', value: 'nvitripennis' },
  { name: 'Nematostella vectensis', value: 'nvectensis' },
  { name: 'Neosartorya fischeri', value: 'nfischeri' },
  { name: 'Neurospora crassa', value: 'ncrassa' },
  { name: 'Nomascus leucogenys', value: 'nleucogenys' },
  { name: 'Ochotona princeps', value: 'oprinceps' },
  { name: 'Onchocerca volvulus', value: 'ovolvulus' },
  { name: 'Oreochromis niloticus', value: 'oniloticus' },
  { name: 'Ornithorhynchus anatinus', value: 'oanatinus' },
  { name: 'Oryctolagus cuniculus', value: 'ocuniculus' },
  { name: 'Oryza barthii', value: 'obarthii' },
  { name: 'Oryza brachyantha', value: 'obrachyantha' },
  { name: 'Oryza glaberrima', value: 'oglaberrima' },
  { name: 'Oryza glumaepatula', value: 'oglumaepatula' },
  { name: 'Oryza longistaminata', value: 'olongistaminata' },
  { name: 'Oryza meridionalis', value: 'omeridionalis' },
  { name: 'Oryza nivara', value: 'onivara' },
  { name: 'Oryza punctata', value: 'opunctata' },
  { name: 'Oryza rufipogon', value: 'orufipogon' },
  { name: 'Oryza sativa Japonica', value: 'osativa' },
  { name: 'Oryza sativa indica', value: 'oindica' },
  { name: 'Oryzias latipes', value: 'olatipes' },
  { name: 'Ostreococcus lucimarinus', value: 'olucimarinus' },
  { name: 'Otolemur garnettii', value: 'ogarnettii' },
  { name: 'Ovis aries', value: 'oaries' },
  { name: 'Pan troglodytes', value: 'ptroglodytes' },
  { name: 'Papio anubis', value: 'panubis' },
  { name: 'Pediculus humanus', value: 'phumanus' },
  { name: 'Pelodiscus sinensis', value: 'psinensis' },
  { name: 'Petromyzon marinus', value: 'pmarinus' },
  { name: 'Phaeosphaeria nodorum', value: 'pnodorum' },
  { name: 'Physcomitrella patens', value: 'ppatens' },
  { name: 'Poecilia formosa', value: 'pformosa' },
  { name: 'Pongo abelii', value: 'pabelii' },
  { name: 'Populus trichocarpa', value: 'ptrichocarpa' },
  { name: 'Pristionchus pacificus', value: 'ppacificus' },
  { name: 'Procavia capensis', value: 'pcapensis' },
  { name: 'Prunus persica', value: 'ppersica' },
  { name: 'Pteropus vampyrus', value: 'pvampyrus' },
  { name: 'Puccinia graminis Ug99', value: 'pgraminisug99' },
  { name: 'Puccinia graminis', value: 'pgraminis' },
  { name: 'Puccinia triticina', value: 'ptriticina' },
  { name: 'Pyrenophora teres f. teres 0-1', value: 'pteres' },
  { name: 'Pyrenophora tritici-repentis Pt-1C-BFP', value: 'ptriticirepentis' },
  { name: 'Rattus norvegicus', value: 'rnorvegicus' },
  { name: 'Rhodnius prolixus', value: 'rprolixus' },
  { name: 'Saccharomyces cerevisiae', value: 'scerevisiae' },
  { name: 'Sarcophilus harrisii', value: 'sharrisii' },
  { name: 'Schistosoma mansoni', value: 'smansoni' },
  { name: 'Schizosaccharomyces cryophilus', value: 'scryophilus' },
  { name: 'Schizosaccharomyces japonicus', value: 'sjaponicus' },
  { name: 'Schizosaccharomyces octosporus', value: 'soctosporus' },
  { name: 'Schizosaccharomyces pombe', value: 'spombe' },
  { name: 'Sclerotinia sclerotiorum', value: 'ssclerotiorum' },
  { name: 'Selaginella moellendorffii', value: 'smoellendorffii' },
  { name: 'Setaria italica', value: 'sitalica' },
  { name: 'Solanum lycopersicum', value: 'slycopersicum' },
  { name: 'Solanum tuberosum', value: 'stuberosum' },
  { name: 'Solenopsis invicta', value: 'sinvicta' },
  { name: 'Sorex araneus', value: 'saraneus' },
  { name: 'Sorghum bicolor', value: 'sbicolor' },
  { name: 'Sporisorium reilianum SRZ2', value: 'sreilianum' },
  { name: 'Strigamia maritima', value: 'smaritima' },
  { name: 'Strongylocentrotus purpuratus', value: 'spurpuratus' },
  { name: 'Sus scrofa', value: 'sscrofa' },
  { name: 'Taeniopygia guttata', value: 'tguttata' },
  { name: 'Takifugu rubripes', value: 'trubripes' },
  { name: 'Tarsius syrichta', value: 'tsyrichta' },
  { name: 'Tetranychus urticae', value: 'turticae' },
  { name: 'Tetraodon nigroviridis', value: 'tnigroviridis' },
  { name: 'Theobroma cacao', value: 'tcacao' },
  { name: 'Tribolium castaneum', value: 'tcastaneum' },
  { name: 'Trichinella spiralis', value: 'tspiralis' },
  { name: 'Trichoderma reesei', value: 'treesei' },
  { name: 'Trichoderma virens', value: 'tvirens' },
  { name: 'Trichoplax adhaerens', value: 'tadhaerens' },
  { name: 'Triticum aestivum', value: 'taestivum' },
  { name: 'Triticum urartu', value: 'turartu' },
  { name: 'Tuber melanosporum', value: 'tmelanosporum' },
  { name: 'Tupaia belangeri', value: 'tbelangeri' },
  { name: 'Tursiops truncatus', value: 'ttruncatus' },
  { name: 'Ustilago maydis', value: 'umaydis' },
  { name: 'Verticillium dahliae JR2', value: 'vdahliaejr2' },
  { name: 'Verticillium dahliae', value: 'vdahliae' },
  { name: 'Vicugna pacos', value: 'vpacos' },
  { name: 'Vitis vinifera', value: 'vvinifera' },
  { name: 'Xenopus tropicalis', value: 'xtropicalis' },
  { name: 'Xiphophorus maculatus', value: 'xmaculatus' },
  { name: 'Yarrowia lipolytica', value: 'ylipolytica' },
  { name: 'Zea mays', value: 'zmays' },
  { name: 'Zootermopsis nevadensis', value: 'znevadensis' },
  { name: 'Zymoseptoria tritici', value: 'ztritici' },
];
export default Species;
