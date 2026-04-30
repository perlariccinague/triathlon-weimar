<?php

return [
    'label' => ['PDF Reader', ''],
    'types' => ['content'],
    'contentCategory' => 'media',
    'fields' => [
        'file' => [
            'label' => ['PDF Datei', ''],
            'inputType' => 'fileTree',
            'eval' => [
                'filesOnly' => true,
                'extensions' => 'pdf',
                'mandatory' => true,
            ],
        ],
    ],
];