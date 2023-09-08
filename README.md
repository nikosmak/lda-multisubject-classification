# lda-multisubject-classification
Multisubject analysis and classification of books and book collections, based on a subject term vocabulary and the Latent Dirichlet Allocation

# LDA Installation document.
* Step 1
Install python 3.8.

Install dependencies
sudo apt install python3.8-distutils

wget https://bootstrap.pypa.io/get-pip.py
python3.8 get-pip.py

* set PATH so it includes user's private bin if it exists
if [ -d "$HOME/.local/bin" ] ; then
    PATH="$HOME/.local/bin:$PATH"
fi

* Step 2
For Windows: In the root workspace folder run install-libs.cmd

For Mac or Linux:In the root workspace folder make install-libs.sh executable and run from shell: ./install-libs.sh.

* Step 3 
Install mallet(requires Java to be installed too)

Extract the mallet-2.0.8.zip to a folder of your choice.
Afterwards edit the jupyter notebook and change the following variables accordingly:
os.environ['MALLET_HOME'] = '{the path where you extracted mallet-2.0.8.zip}' (e.g: /usr/local/mallet-2.0.8)
mallet_path = "{the path where you extracted mallet}/bin/mallet"

* Step 4
Execute in jupyter notebook
Run the code in jupyter notebook

Dynamic number of topics (Optimum) or fixed number of topics
For Dynamic topic modelling set the variable in jupyter notebook
OPTIMIMUM_NUMBER_OF_TOPICS_ENABLED = True
Else for fixed number of topics which will be equal to the categories set
OPTIMIMUM_NUMBER_OF_TOPICS_ENABLED = False.

Training the model or using the cached one
Each time the algorithm is executed two files are saved to the root directory of the current jupyter notebook: springer_lda.model and springer.dictionary.
For the training process to be initiated and the model to be trained the files:
springer_lda.model and springer.dictionary must be deleted if they exist. If they exist, the training process and the dictionary initialization will be skipped since the cached ones will be used.
