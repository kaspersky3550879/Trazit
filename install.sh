#!/usr/bin/env bash

echo ======
echo preinstall
pwd
echo

requirements=$@
yalcDir=`yalc dir`

echo deleting old packages
rm -rf node_modules package-lock.json .yalc yalc.lock

# link local requirements
for r in $requirements; do
  if [ ! -d $yalcDir/packages/$r ]; then
    echo $r
    zenity --info --text="$r is not already linked to the global ~/.yalc/packages. go to $r\'s location and run yalc publish there first"
    echo
    break
  else
    echo
    echo $r
    echo
    yalc add $r
  fi
done

echo
echo preinstall done
echo
echo installing the packages
npm i
if [ $? -eq 0 ]
then
  pwd
  echo ======
  echo
else
  echo "Oopp.. Installation fault! please rerun yalclink"
  exit 1
fi