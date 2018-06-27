import $ from 'jquery';

class MyNotes {
    constructor(){
       this.events();
    }
    events(){
        $("#my-notes").on("click", ".delete-note", this.deleteNote);
        $("#my-notes").on("click", ".edit-note", this.editNote.bind(this));
        $("#my-notes").on("click", ".update-note", this.updateNote.bind(this));
        $(".submit-note").on("click", this.createNote.bind(this));

    }
    // Custom methods
    deleteNote(e){
        let currentNote = $(e.target).parents('li');

        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/wp/v2/note/' + currentNote.data('id'),
            type: 'DELETE',
            success: (response) => {
                currentNote.slideUp(); // Remove element and refresh page using animation
                console.log('SUCCESS');
                console.log(response);
                if(response.userNoteCount < 3){
                    $('.note-limit-message').removeClass('active');
                }
            },
            error: (response) => {
                console.log('FAIL');
                console.log(response);
            }
        });
    }

    updateNote(e){
        let currentNote = $(e.target).parents('li');
        let updatedPost = {
            'title': currentNote.find('.note-title-field').val(),
            'content': currentNote.find('.note-body-field').val()
        };

        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/wp/v2/note/' + currentNote.data('id'),
            type: 'POST',
            data: updatedPost,
            success: (response) => {
                this.makeNoteReadOnly(currentNote);
                console.log('SUCCESS');
                console.log(response);
            },
            error: (response) => {
                console.log('FAIL');
                console.log(response);
            }
        });
    }

    createNote(e){
        let ourNewPost = {
            'title': $('.new-note-title').val(),
            'content': $('.new-note-body').val(),
            'status': 'publish' // default is draft
        };

        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/wp/v2/note/',
            type: 'POST',
            data: ourNewPost,
            success: (response) => {
                $('.new-note-title, .new-note-body').val(''); // Clear input fields
                $(`
                  <li data-id="${response.id}">
					<input readonly class="note-title-field" value=${response.title.raw}>
						<span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
						<span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>
					<textarea readonly class="note-body-field">${response.content.raw}</textarea>
                    <span class="update-note btn btn--blue btn--small" ><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>
                </li>
                `).prependTo('#my-notes').hide().slideDown();
                console.log('SUCCESS');
                console.log(response);
            },
            error: (response) => {
                if(response.responseText === 'You have reached your note limit.'){
                    $(".note-limit-message").addClass('active');
                }
                console.log('FAIL');
                console.log(response);
            }
        });
    }


    editNote(e){
        let currentNote = $(e.target).parents('li');
        if(currentNote.data('state') === 'editable'){
            this.makeNoteReadOnly(currentNote)
        } else {
            this.makeNoteEditable(currentNote);
        }

    }

    makeNoteEditable(currentNote){
        currentNote.find('.edit-note').html('<i class="fa fa-times" aria-hidden="true"></i> Cancel');
        currentNote.find('.note-title-field, .note-body-field').removeAttr('readonly').addClass('note-active-field');
        currentNote.find('.update-note').addClass('update-note--visible');
        currentNote.data('state', 'editable');
    }

    makeNoteReadOnly(currentNote){
        currentNote.find('.edit-note').html('<i class="fa fa-pencil" aria-hidden="true"></i> Edit');
        currentNote.find('.note-title-field, .note-body-field').attr('readonly', 'readonly').removeClass('note-active-field');
        currentNote.find('.update-note').removeClass('update-note--visible');
        currentNote.data('state', 'cancel');
    }
}



export default MyNotes;