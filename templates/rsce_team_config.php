<?php
return [
    'label' => ['Team / Trainer', 'Équipe ou entraîneurs'],
    'types' => ['content'],
    'contentCategory' => 'texts',
    'standardFields' => ['cssID'],

    'fields' => [

        'type' => [
            'label' => ['Type', 'Team oder Trainer'],
            'inputType' => 'select',
            'options' => [
                'team' => 'Team',
                'trainer' => 'Trainer',
            ],
            'eval' => ['mandatory' => true, 'tl_class' => 'w50'],
            'default' => 'team',
        ],

        'team' => [
            'label' => ['Mitglieder', ''],
            'inputType' => 'list',
            'fields' => [

                'image' => [
                    'label' => ['Bild', ''],
                    'inputType' => 'fileTree',
                    'eval' => [
                        'filesOnly' => true,
                        'mandatory' => true,
                        'fieldType' => 'radio'
                    ],
                ],

                'firstname' => [
                    'label' => ['Vorname', ''],
                    'inputType' => 'text',
                    'eval' => ['mandatory' => true],
                ],

                'lastname' => [
                    'label' => ['Nachname', ''],
                    'inputType' => 'text',
                    'eval' => ['mandatory' => true],
                ],

                'number1' => [
                    'label' => ['1. LIGA', ''],
                    'inputType' => 'text',
                    'eval' => ['rgxp' => 'digit', 'tl_class' => 'w50'],
                ],

                'number2' => [
                    'label' => ['2. LIGA', ''],
                    'inputType' => 'text',
                    'eval' => ['rgxp' => 'digit', 'tl_class' => 'w50'],
                ],

                'year' => [
                    'label' => ['Jahr', ''],
                    'inputType' => 'text',
                    'eval' => ['rgxp' => 'digit', 'tl_class' => 'w50'],
                ],

                'position' => [
                    'label' => ['Position', 'z.B Trainer, Teammanager'],
                    'inputType' => 'text',
                    'eval' => ['tl_class' => 'w50'],
                ],

                'mail' => [
                    'label' => ['E-Mail', ''],
                    'inputType' => 'text',
                    'eval' => ['rgxp' => 'email', 'tl_class' => 'w50'],
                ],

                'description' => [
                    'label' => ['Description', ''],
                    'inputType' => 'text',
                    'eval' => ['tl_class' => 'clr'],
                ],

                'flag_emoji' => [
                    'label' => ['Flagge', 'Flagge auswählen'],
                    'inputType' => 'select',
                    'options' => [
                        '🏴' => 'Neutral',
                        '🇫🇷' => 'Frankreich',
                        '🇩🇪' => 'Deutschland',
                        '🇧🇪' => 'Belgien',
                        '🇨🇭' => 'Schweiz',
                        '🇮🇹' => 'Italien',
                        '🇪🇸' => 'Spanien',
                        '🇬🇧' => 'Vereinigtes Königreich',
                        '🇺🇸' => 'USA',
                    ],
                    'eval' => ['includeBlankOption' => true, 'tl_class' => 'w50'],
                ],

            ],
            'eval' => [
                'minItems' => 1,
                'maxItems' => 20,
                'sortable' => true
            ],
        ],

    ],
];