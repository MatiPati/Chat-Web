@if ($errors->any())

    <div class="alert alert-danger alert-dismissible" role="alert">
        {{ implode('', $errors->all(':message ')) }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>

@endif

@if(@session('message'))
    <div class="alert alert-info alert-dismissible" role="alert">
        {{session('message')}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
@endif