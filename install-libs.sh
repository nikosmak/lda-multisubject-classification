pip3.8 install Cython
pip3.8 install -r libs.txt
pip3.8 install spacy --upgrade
pip3.8 install textacy --upgrade
python3.8 -m spacy download el_core_news_md
python3.8 -m spacy download en_core_web_md