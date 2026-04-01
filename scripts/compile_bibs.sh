 > all.bib
for file_name in content/publication/*/cite.bib ;do
    cat ${file_name} >> all.bib
    echo \\n\\n\\n >> all.bib
done
