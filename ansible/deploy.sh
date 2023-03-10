#!/bin/bash
ansible-playbook -vvv -u root --extra-vars "token=$TOKEN" -i   inventories/dev/inventory    $1 
#--tags $1
