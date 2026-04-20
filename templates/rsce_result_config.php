<?php
return array(
    'label' => array('Ergebnisse', 'Meine Beschreibung...'),
    'types' => array('content', 'module'),
    'contentCategory' => 'texts',
    'moduleCategory' => 'miscellaneous',
    'beTemplate' => 'be_wildcard',
    'standardFields' => array('headline', 'cssID'),
    'wrapper' => array(
        'type' => 'none',
    ),
    'fields' => array(
        'title' => array(
            'label' => array('Überschrift', '...'),
            'inputType' => 'text',

        ),

        'date' => array(
            'label' => array('Date', '...'),
            'eval' => [
                'rgxp' => 'date',
                'datepicker' => true,
                'mandatory' => true,
                'tl_class' => 'w50 wizard'
            ],
            'inputType' => 'text',

        ),

        'location' => array(
            'label' => array('Ort', '..'),
            'inputType' => 'text',
        ),
        'link_url' => array(
            'label' => ['Interne Link', 'URL eingeben'],
            'inputType' => 'url',
            'eval' => [
                'rgxp' => 'url',
                'decodeEntities' => true,
                'tl_class' => 'w50'
            ],
        ),
    )
);

