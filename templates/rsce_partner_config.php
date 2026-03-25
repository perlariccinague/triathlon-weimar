<?php
return [
    'label' => ['partner'],
    'types' => ['content'],
    'contentCategory' => 'media',
    'standardFields' => ['cssID'],
    'fields' => [
        'partners' => [
            'label' => ['Partner einfügen'],
            'inputType' => 'list',
            'fields' => [

                'title' => [
                    'label' => ['Überschrift', '...'],
                    'inputType' => 'text',
                    'eval' => ['mandatory' => true, 'maxlength' => 255],
                ],
                'primary' => [
                    'label' => ['Hauptpartner', '...'],
                    'inputType' => 'checkbox',
                ],

                'logos' => [
                    'label' => ['Logos'],
                    'inputType' => 'list',
                    'fields' => [
                        'logo' => [
                            'label' => ['Logo'],
                            'inputType' => 'fileTree',
                            'eval' => [
                                'filesOnly' => true,
                                'mandatory' => true,
                                'fieldType' => 'radio'
                            ],
                        ],
                        'link_url' => [
                            'label' => ['Link'],
                            'inputType' => 'text',
                            'eval' => [
                                'rgxp' => 'url',
                                'decodeEntities' => true,
                                'mandatory' => true
                            ],
                        ],
                    ],
                    'eval' => ['minItems' => 1, 'maxItems' => 10, 'sortable' => true],
                ],

            ],
            'eval' => ['minItems' => 1, 'maxItems' => 20, 'sortable' => true],
        ],
    ],
];