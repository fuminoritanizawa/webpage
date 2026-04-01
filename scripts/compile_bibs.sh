> all.bib
for file_name in content/publication/*/cite.bib; do
    cat "${file_name}" >> all.bib
    printf '\n\n\n' >> all.bib
done
