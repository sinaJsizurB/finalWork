<?php
define('PRIVATE_DIR', __DIR__ . '/./private/');

include PRIVATE_DIR . 'bootstrap.php';

use Database\Subscribers;

header('Content-type: application/json');

$output = ['status' => false];

if (isset($_GET['name']) && is_string($_GET['name'])) {
    switch ($_GET['name']) {
        case 'subscribe':
            $output['status'] = isset($_POST['name']);
            if (
                (isset($_POST['datepicker']) && is_string($_POST['datepicker'])) &&
                (isset($_POST['name']) && is_string($_POST['name'])) &&
                (isset($_POST['surname']) && is_string($_POST['surname'])) &&
                (isset($_POST['email']) && is_string($_POST['email'])) &&
                (isset($_POST['phone']) && is_string($_POST['phone']))

            ) {
                $subscribers = new Subscribers();

                $entity = [
                    'datepicker' => $_POST['datepicker'],
                    'name' => $_POST['name'],
                    'surname' => $_POST['surname'],
                    'email' => $_POST['email'],
                    'phone' => $_POST['phone']
                ];

                $entity = $subscribers->addEntity($entity);
                if (is_array($entity)) {
                    $output['status'] = true;
                    $output['entity'] = $entity;
                    $output['message'] = 'Jūsu pieteikums ir nosūtīts!';
                } else {
                    $output['message'] = 'Ir radusies kāda kļūda, pārbaudiet anketu un nosūtiet vēlreiz!';
                    if (DEBUG_MODE) {
                        $output['message'] .= ' ' . $subscribers->getError();
                    }
                }
            }
            break;
    }
}

echo json_encode($output, JSON_PRETTY_PRINT);
