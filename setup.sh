# In terminal
# chmod  +x setup.sh
# setup.sh


for eachfile in `ls ./revisions/*.json`
do
  mongoimport --jsonArray --db Assignment2 --collection revisions --file $eachfile
done