#!/bin/bash
ansible-playbook -vv -u root --extra-vars "token=$TOKEN" -i   inventories/dev/inventory    $1 
#--tags $1
