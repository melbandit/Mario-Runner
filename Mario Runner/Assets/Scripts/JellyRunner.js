#pragma strict

private var rb:Rigidbody2D;
public var jumpHeight:int = 10;
public var acceleration:float = 0.1;
public var startSpeed:float = 2;
public var maxSpeed:float = 4;

function Start () {
//change the players position
	rb = gameObject.GetComponent(Rigidbody2D);
	//Debug.Log("Hate this headache");
	rb.velocity.x = startSpeed;
}

function FixedUpdate () {
	rb.velocity.x = rb.velocity.x + acceleration; //or +=acceleration

	var rayStart:Vector3 = transform.position;
	rayStart.x += 0.1;

	Debug.DrawRay(rayStart, Vector2.down * 0.01, Color.green, 1);
	//gets the position of mario

	var hit:RaycastHit2D = Physics2D.Raycast( rayStart, Vector2.down, 0.01);
	Debug.Log( hit.collider);

	if ( Input.GetAxis("Vertical") > 0 && hit.collider){
		Debug.Log("Jump!");
		rb.velocity.y = jumpHeight;
	}

	if(rb.velocity.magnitude > maxSpeed)
     {
        rb.velocity = rb.velocity.normalized * maxSpeed;
     }
}